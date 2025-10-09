/**
 * 強化版欄位搜尋腳本 - 針對 Google Forms 動態載入
 */

(function() {
    console.log('🔍 強化版欄位搜尋 - 針對 Google Forms 動態載入\n');
    console.log('═'.repeat(80));
    
    // 方法1: 等待頁面完全載入後搜尋
    console.log('📋 方法1: 等待頁面載入完成後搜尋...\n');
    
    function searchAllFields() {
        const allMethods = [
            searchByFormElements,
            searchByInputElements,
            searchByPageSource,
            searchByFormStructure
        ];
        
        let allFoundFields = [];
        
        allMethods.forEach((method, index) => {
            console.log(`🔍 方法${index + 1}: ${method.name}...`);
            try {
                const fields = method();
                if (fields && fields.length > 0) {
                    allFoundFields = allFoundFields.concat(fields);
                    console.log(`✅ 找到 ${fields.length} 個欄位`);
                } else {
                    console.log(`❌ 未找到欄位`);
                }
            } catch (error) {
                console.log(`❌ 執行失敗: ${error.message}`);
            }
            console.log('─'.repeat(60));
        });
        
        // 去重複
        const uniqueFields = allFoundFields.filter((field, index, self) => 
            index === self.findIndex(f => f.name === field.name)
        );
        
        console.log(`\n📊 總共找到 ${uniqueFields.length} 個唯一欄位：\n`);
        
        uniqueFields.forEach((field, index) => {
            console.log(`${index + 1}. ${field.name}`);
            console.log(`   類型: ${field.type}`);
            console.log(`   標籤: ${field.tagName}`);
            if (field.value) console.log(`   值: ${field.value}`);
            if (field.placeholder) console.log(`   佔位符: ${field.placeholder}`);
            console.log('─'.repeat(60));
        });
        
        // 生成欄位對應
        generateFieldMapping(uniqueFields);
        
        return uniqueFields;
    }
    
    function searchByFormElements() {
        const forms = document.querySelectorAll('form');
        const fields = [];
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
            inputs.forEach(input => {
                if (!input.name.includes('_sentinel')) {
                    fields.push({
                        name: input.name,
                        type: input.type || input.tagName.toLowerCase(),
                        tagName: input.tagName,
                        value: input.value,
                        placeholder: input.placeholder,
                        element: input
                    });
                }
            });
        });
        
        return fields;
    }
    
    function searchByInputElements() {
        const allInputs = document.querySelectorAll('input, textarea, select');
        const fields = [];
        
        allInputs.forEach(input => {
            if (input.name && input.name.startsWith('entry.') && !input.name.includes('_sentinel')) {
                fields.push({
                    name: input.name,
                    type: input.type || input.tagName.toLowerCase(),
                    tagName: input.tagName,
                    value: input.value,
                    placeholder: input.placeholder,
                    element: input
                });
            }
        });
        
        return fields;
    }
    
    function searchByPageSource() {
        const pageHTML = document.documentElement.innerHTML;
        const entryMatches = pageHTML.match(/entry\.\d+/g);
        
        if (!entryMatches) return [];
        
        const uniqueEntries = [...new Set(entryMatches)];
        const fields = [];
        
        uniqueEntries.forEach(entry => {
            if (!entry.includes('_sentinel')) {
                fields.push({
                    name: entry,
                    type: 'unknown',
                    tagName: 'UNKNOWN',
                    value: '',
                    placeholder: '',
                    element: null
                });
            }
        });
        
        return fields;
    }
    
    function searchByFormStructure() {
        const fields = [];
        
        // 搜尋所有可能包含表單的容器
        const containers = document.querySelectorAll('[role="listitem"], .freebirdFormviewerComponentsQuestionBaseRoot, [jscontroller]');
        
        containers.forEach(container => {
            const inputs = container.querySelectorAll('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
            inputs.forEach(input => {
                if (!input.name.includes('_sentinel')) {
                    fields.push({
                        name: input.name,
                        type: input.type || input.tagName.toLowerCase(),
                        tagName: input.tagName,
                        value: input.value,
                        placeholder: input.placeholder,
                        element: input,
                        container: container
                    });
                }
            });
        });
        
        return fields;
    }
    
    function generateFieldMapping(fields) {
        console.log('\n🎯 生成欄位對應：\n');
        
        // 按名稱排序，確保一致性
        fields.sort((a, b) => a.name.localeCompare(b.name));
        
        const fieldMapping = {
            companyName: fields[0]?.name || 'entry.XXXXXXXXXX',
            contactPerson: fields[1]?.name || 'entry.XXXXXXXXXX',
            email: fields[2]?.name || 'entry.XXXXXXXXXX',
            phone: fields[3]?.name || 'entry.XXXXXXXXXX',
            services: fields[4]?.name || 'entry.XXXXXXXXXX',
            budget: fields[5]?.name || 'entry.XXXXXXXXXX',
            timeline: fields[6]?.name || 'entry.XXXXXXXXXX',
            requirements: fields[7]?.name || 'entry.XXXXXXXXXX'
        };
        
        console.log('const fieldMapping = {');
        console.log(`    companyName: '${fieldMapping.companyName}',      // 公司名稱`);
        console.log(`    contactPerson: '${fieldMapping.contactPerson}',    // 聯絡人姓名`);
        console.log(`    email: '${fieldMapping.email}',            // 電子信箱`);
        console.log(`    phone: '${fieldMapping.phone}',            // 聯絡電話`);
        console.log(`    services: '${fieldMapping.services}',         // 感興趣的服務`);
        console.log(`    budget: '${fieldMapping.budget}',           // 預算範圍`);
        console.log(`    timeline: '${fieldMapping.timeline}',         // 期望完成時間`);
        console.log(`    requirements: '${fieldMapping.requirements}'      // 詳細需求描述`);
        console.log('};');
        
        console.log('\n═'.repeat(80));
        console.log('\n✅ 完成！請複製上面的欄位對應程式碼');
        
        // 儲存結果
        window.allFormFields = {
            fields: fields,
            mapping: fieldMapping
        };
        
        console.log('\n💾 結果已儲存到 window.allFormFields');
    }
    
    // 等待頁面載入完成
    if (document.readyState === 'complete') {
        // 頁面已載入完成，直接搜尋
        searchAllFields();
    } else {
        // 等待頁面載入完成
        console.log('⏳ 等待頁面載入完成...');
        window.addEventListener('load', () => {
            setTimeout(() => {
                console.log('✅ 頁面載入完成，開始搜尋...\n');
                searchAllFields();
            }, 2000); // 額外等待2秒確保動態內容載入
        });
    }
    
    // 額外的調試函數
    window.debugGoogleForms = function() {
        console.log('🔧 調試 Google Forms 結構...');
        
        // 檢查表單元素
        const forms = document.querySelectorAll('form');
        console.log(`找到 ${forms.length} 個表單元素`);
        
        forms.forEach((form, index) => {
            console.log(`表單 ${index + 1}:`, form);
            const inputs = form.querySelectorAll('input, textarea, select');
            console.log(`  包含 ${inputs.length} 個輸入元素`);
        });
        
        // 檢查頁面中的 entry 文字
        const pageText = document.documentElement.textContent;
        const entryMatches = pageText.match(/entry\.\d+/g);
        if (entryMatches) {
            console.log(`頁面文字中找到的 entry: ${[...new Set(entryMatches)]}`);
        }
    };
    
    console.log('\n🔧 額外功能已載入：');
    console.log('- 執行 debugGoogleForms() 進行深度調試');
})();
