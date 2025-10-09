/**
 * Google Forms 欄位提取腳本 V2 - 強化版
 * 
 * 使用方法：
 * 1. 開啟 Google Forms: https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/viewform
 * 2. 按 F12 開啟開發者工具
 * 3. 切換到 Console 標籤
 * 4. 複製並貼上此腳本的全部內容
 * 5. 按 Enter 執行
 */

(function() {
    console.log('🔍 Google Forms 欄位提取腳本 V2 - 強化版\n');
    console.log('═'.repeat(80));
    
    // 等待頁面完全載入
    if (document.readyState !== 'complete') {
        console.log('⏳ 等待頁面載入完成...');
        window.addEventListener('load', extractFields);
        return;
    }
    
    extractFields();
    
    function extractFields() {
        console.log('🚀 開始掃描所有可能的欄位...\n');
        
        // 方法1: 直接搜尋所有包含 entry. 的元素
        const allElements = document.querySelectorAll('*');
        const entryFields = [];
        
        allElements.forEach(element => {
            if (element.name && element.name.startsWith('entry.')) {
                // 過濾掉 sentinel 欄位
                if (!element.name.includes('_sentinel')) {
                    entryFields.push(element);
                }
            }
        });
        
        console.log(`✅ 找到 ${entryFields.length} 個實際表單欄位\n`);
        
        if (entryFields.length === 0) {
            console.log('❌ 沒有找到表單欄位，嘗試其他方法...\n');
            tryAlternativeMethods();
            return;
        }
        
        // 分析找到的欄位
        analyzeFields(entryFields);
    }
    
    function tryAlternativeMethods() {
        console.log('🔧 嘗試其他掃描方法...\n');
        
        // 方法2: 搜尋所有 input, textarea, select
        const formElements = document.querySelectorAll('input, textarea, select');
        const validFields = [];
        
        formElements.forEach(element => {
            if (element.name && element.name.startsWith('entry.') && !element.name.includes('_sentinel')) {
                validFields.push(element);
            }
        });
        
        console.log(`📋 方法2找到 ${validFields.length} 個欄位\n`);
        
        if (validFields.length > 0) {
            analyzeFields(validFields);
        } else {
            console.log('❌ 仍然沒有找到欄位，顯示頁面結構分析...\n');
            analyzePageStructure();
        }
    }
    
    function analyzePageStructure() {
        console.log('🔍 分析頁面結構...\n');
        
        // 搜尋包含 "entry." 的所有文字
        const pageText = document.documentElement.innerHTML;
        const entryMatches = pageText.match(/entry\.\d+/g);
        
        if (entryMatches) {
            const uniqueEntries = [...new Set(entryMatches)];
            console.log(`📝 在頁面原始碼中找到的 entry 欄位：\n`);
            
            uniqueEntries.forEach((entry, index) => {
                console.log(`${index + 1}. ${entry}`);
            });
            
            console.log('\n💡 建議手動檢查這些欄位：');
            console.log('1. 在開發者工具的 Elements 標籤中搜尋這些 entry 名稱');
            console.log('2. 找到對應的 input/textarea/select 元素');
            console.log('3. 查看其周圍的文字來確定欄位用途\n');
            
            // 嘗試根據常見模式推測欄位對應
            suggestFieldMapping(uniqueEntries);
        } else {
            console.log('❌ 頁面中沒有找到任何 entry 欄位');
            console.log('💡 可能的原因：');
            console.log('1. 表單尚未完全載入');
            console.log('2. 表單結構發生變化');
            console.log('3. 需要登入 Google 帳號');
        }
    }
    
    function analyzeFields(fields) {
        console.log('📊 分析找到的欄位：\n');
        console.log('─'.repeat(80));
        
        const fieldList = [];
        
        fields.forEach((field, index) => {
            const name = field.name;
            const type = field.type || field.tagName.toLowerCase();
            
            // 嘗試找到欄位標籤 - 多種方法
            let label = '';
            
            // 方法1: 查找最近的標題元素
            const container = field.closest('[role="listitem"]') || 
                             field.closest('div[data-params]') ||
                             field.closest('.freebirdFormviewerComponentsQuestionBaseRoot') ||
                             field.closest('[jscontroller]');
            
            if (container) {
                const labelElement = container.querySelector('[role="heading"]') || 
                                    container.querySelector('.freebirdFormviewerComponentsQuestionBaseTitle') ||
                                    container.querySelector('label') ||
                                    container.querySelector('[data-params*="title"]') ||
                                    container.querySelector('span[data-params]');
                if (labelElement) {
                    label = labelElement.textContent.trim();
                }
            }
            
            // 方法2: 查找前一個元素
            if (!label) {
                let prevElement = field.previousElementSibling;
                while (prevElement && !label) {
                    if (prevElement.textContent && prevElement.textContent.trim()) {
                        label = prevElement.textContent.trim();
                    }
                    prevElement = prevElement.previousElementSibling;
                }
            }
            
            // 方法3: 查找父元素中的文字
            if (!label) {
                const parent = field.parentElement;
                if (parent && parent.textContent) {
                    const text = parent.textContent.trim();
                    if (text.length > 0 && text.length < 100) {
                        label = text;
                    }
                }
            }
            
            const fieldInfo = {
                index: index + 1,
                name: name,
                type: type,
                label: label,
                element: field
            };
            
            fieldList.push(fieldInfo);
            
            console.log(`${index + 1}. ${name}`);
            console.log(`   類型: ${type}`);
            console.log(`   標籤: ${label || '(未找到標籤)'}`);
            console.log(`   元素: ${field.tagName}`);
            console.log('─'.repeat(80));
        });
        
        // 智能推測欄位對應
        generateFieldMapping(fieldList);
    }
    
    function suggestFieldMapping(entries) {
        console.log('🎯 基於常見模式的欄位對應建議：\n');
        
        // 通常 Google Forms 會按照表單順序分配 entry ID
        const commonMapping = {
            '公司名稱': entries[0] || 'entry.XXXXXXXXXX',
            '聯絡人姓名': entries[1] || 'entry.XXXXXXXXXX',
            '電子信箱': entries[2] || 'entry.XXXXXXXXXX',
            '聯絡電話': entries[3] || 'entry.XXXXXXXXXX',
            '感興趣的服務': entries[4] || 'entry.XXXXXXXXXX',
            '預算範圍': entries[5] || 'entry.XXXXXXXXXX',
            '期望完成時間': entries[6] || 'entry.XXXXXXXXXX',
            '詳細需求描述': entries[7] || 'entry.XXXXXXXXXX'
        };
        
        console.log('建議的欄位對應（按順序）：\n');
        Object.entries(commonMapping).forEach(([key, value]) => {
            console.log(`${key}: ${value}`);
        });
        
        console.log('\n📝 生成的程式碼：\n');
        const code = `const fieldMapping = {
    companyName: '${commonMapping['公司名稱']}',      // 公司名稱
    contactPerson: '${commonMapping['聯絡人姓名']}',    // 聯絡人姓名
    email: '${commonMapping['電子信箱']}',            // 電子信箱
    phone: '${commonMapping['聯絡電話']}',            // 聯絡電話
    services: '${commonMapping['感興趣的服務']}',         // 感興趣的服務
    budget: '${commonMapping['預算範圍']}',           // 預算範圍
    timeline: '${commonMapping['期望完成時間']}',         // 期望完成時間
    requirements: '${commonMapping['詳細需求描述']}'      // 詳細需求描述
};`;
        
        console.log(code);
        
        console.log('\n⚠️  注意：這是基於常見模式的推測，建議手動驗證！');
    }
    
    function generateFieldMapping(fieldList) {
        console.log('\n🎯 智能推測欄位對應：\n');
        
        const suggestions = {
            '公司名稱': null,
            '聯絡人姓名': null,
            '電子信箱': null,
            '聯絡電話': null,
            '感興趣的服務': null,
            '預算範圍': null,
            '期望完成時間': null,
            '詳細需求描述': null
        };
        
        // 基於標籤文字推測
        fieldList.forEach(field => {
            const label = field.label.toLowerCase();
            
            if (label.includes('公司') || label.includes('company')) {
                suggestions['公司名稱'] = field.name;
            } else if (label.includes('聯絡人') || label.includes('姓名') || label.includes('name')) {
                suggestions['聯絡人姓名'] = field.name;
            } else if (label.includes('信箱') || label.includes('email') || label.includes('e-mail')) {
                suggestions['電子信箱'] = field.name;
            } else if (label.includes('電話') || label.includes('phone') || label.includes('tel')) {
                suggestions['聯絡電話'] = field.name;
            } else if (label.includes('服務') || label.includes('service')) {
                suggestions['感興趣的服務'] = field.name;
            } else if (label.includes('預算') || label.includes('budget')) {
                suggestions['預算範圍'] = field.name;
            } else if (label.includes('時間') || label.includes('時程') || label.includes('timeline')) {
                suggestions['期望完成時間'] = field.name;
            } else if (label.includes('需求') || label.includes('描述') || label.includes('requirement') || label.includes('description')) {
                suggestions['詳細需求描述'] = field.name;
            }
        });
        
        // 如果基於標籤的推測失敗，使用順序推測
        const unmatchedFields = fieldList.filter(field => !Object.values(suggestions).includes(field.name));
        const unmatchedSuggestions = Object.entries(suggestions).filter(([key, value]) => !value);
        
        if (unmatchedFields.length > 0 && unmatchedSuggestions.length > 0) {
            console.log('📋 基於標籤的推測結果：\n');
            Object.entries(suggestions).forEach(([key, value]) => {
                console.log(`${key}: ${value || '(未找到)'}`);
            });
            
            console.log('\n🔄 使用順序推測補齊未匹配的欄位：\n');
            unmatchedSuggestions.forEach(([key, value], index) => {
                if (unmatchedFields[index]) {
                    suggestions[key] = unmatchedFields[index].name;
                    console.log(`${key}: ${unmatchedFields[index].name} (順序推測)`);
                }
            });
        } else {
            console.log('📋 推測結果：\n');
            Object.entries(suggestions).forEach(([key, value]) => {
                console.log(`${key}: ${value || '(未找到)'}`);
            });
        }
        
        console.log('\n═'.repeat(80));
        console.log('\n📝 最終生成的程式碼：\n');
        
        const code = `const fieldMapping = {
    companyName: '${suggestions['公司名稱'] || 'entry.XXXXXXXXXX'}',      // 公司名稱
    contactPerson: '${suggestions['聯絡人姓名'] || 'entry.XXXXXXXXXX'}',    // 聯絡人姓名
    email: '${suggestions['電子信箱'] || 'entry.XXXXXXXXXX'}',            // 電子信箱
    phone: '${suggestions['聯絡電話'] || 'entry.XXXXXXXXXX'}',            // 聯絡電話
    services: '${suggestions['感興趣的服務'] || 'entry.XXXXXXXXXX'}',         // 感興趣的服務
    budget: '${suggestions['預算範圍'] || 'entry.XXXXXXXXXX'}',           // 預算範圍
    timeline: '${suggestions['期望完成時間'] || 'entry.XXXXXXXXXX'}',         // 期望完成時間
    requirements: '${suggestions['詳細需求描述'] || 'entry.XXXXXXXXXX'}'      // 詳細需求描述
};`;
        
        console.log(code);
        
        console.log('\n═'.repeat(80));
        console.log('\n✅ 欄位提取完成！');
        console.log('\n💡 下一步：');
        console.log('1. 複製上面的 JavaScript 程式碼');
        console.log('2. 告訴開發者這些欄位名稱');
        console.log('3. 開發者會更新系統代碼');
        
        // 將結果存到 window 物件
        window.extractedFieldsV2 = {
            fields: fieldList,
            suggestions: suggestions,
            code: code
        };
        
        console.log('\n💾 結果已儲存到 window.extractedFieldsV2');
    }
})();

// 輔助函數
function copyFieldMappingV2() {
    if (window.extractedFieldsV2 && window.extractedFieldsV2.code) {
        navigator.clipboard.writeText(window.extractedFieldsV2.code).then(() => {
            console.log('✅ 欄位對應程式碼已複製到剪貼簿！');
        }).catch(err => {
            console.error('❌ 複製失敗:', err);
            console.log('請手動複製上面的程式碼');
        });
    } else {
        console.error('❌ 請先執行欄位提取腳本');
    }
}

console.log('\n🔧 輔助函數已載入：');
console.log('- 執行 copyFieldMappingV2() 可以複製欄位對應程式碼到剪貼簿');
