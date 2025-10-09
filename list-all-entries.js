/**
 * 列出 Google Forms 所有 entry 欄位名稱
 * 
 * 使用方法：
 * 1. 開啟 Google Forms: https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/viewform
 * 2. 按 F12 開啟開發者工具
 * 3. 切換到 Console 標籤
 * 4. 複製並貼上此腳本的全部內容
 * 5. 按 Enter 執行
 */

(function() {
    console.log('📋 列出 Google Forms 所有 entry 欄位名稱\n');
    console.log('═'.repeat(80));
    
    // 方法1: 搜尋所有包含 entry. 的元素
    console.log('🔍 方法1: 搜尋所有包含 entry. 的元素\n');
    
    const allElements = document.querySelectorAll('*');
    const allEntryFields = [];
    
    allElements.forEach(element => {
        if (element.name && element.name.startsWith('entry.')) {
            allEntryFields.push({
                name: element.name,
                type: element.type || element.tagName.toLowerCase(),
                tagName: element.tagName,
                id: element.id,
                className: element.className,
                element: element
            });
        }
    });
    
    console.log(`✅ 找到 ${allEntryFields.length} 個 entry 欄位：\n`);
    
    allEntryFields.forEach((field, index) => {
        console.log(`${index + 1}. ${field.name}`);
        console.log(`   標籤: ${field.tagName}`);
        console.log(`   類型: ${field.type}`);
        if (field.id) console.log(`   ID: ${field.id}`);
        if (field.className) console.log(`   Class: ${field.className}`);
        console.log('─'.repeat(60));
    });
    
    // 方法2: 搜尋頁面原始碼中的所有 entry. 文字
    console.log('\n🔍 方法2: 搜尋頁面原始碼中的所有 entry. 文字\n');
    
    const pageHTML = document.documentElement.innerHTML;
    const entryMatches = pageHTML.match(/entry\.\d+/g);
    
    if (entryMatches) {
        const uniqueEntries = [...new Set(entryMatches)];
        console.log(`✅ 在頁面原始碼中找到 ${uniqueEntries.length} 個唯一的 entry 欄位：\n`);
        
        uniqueEntries.forEach((entry, index) => {
            console.log(`${index + 1}. ${entry}`);
        });
    } else {
        console.log('❌ 在頁面原始碼中沒有找到 entry 欄位');
    }
    
    // 方法3: 搜尋所有 input, textarea, select 元素
    console.log('\n🔍 方法3: 搜尋所有表單元素\n');
    
    const formElements = document.querySelectorAll('input, textarea, select');
    const formEntryFields = [];
    
    formElements.forEach(element => {
        if (element.name && element.name.startsWith('entry.')) {
            formEntryFields.push({
                name: element.name,
                type: element.type || element.tagName.toLowerCase(),
                tagName: element.tagName,
                value: element.value || '',
                placeholder: element.placeholder || '',
                element: element
            });
        }
    });
    
    console.log(`✅ 找到 ${formEntryFields.length} 個表單 entry 欄位：\n`);
    
    formEntryFields.forEach((field, index) => {
        console.log(`${index + 1}. ${field.name}`);
        console.log(`   標籤: ${field.tagName}`);
        console.log(`   類型: ${field.type}`);
        if (field.value) console.log(`   值: ${field.value}`);
        if (field.placeholder) console.log(`   佔位符: ${field.placeholder}`);
        console.log('─'.repeat(60));
    });
    
    // 分類顯示
    console.log('\n📊 分類顯示結果：\n');
    
    const regularFields = allEntryFields.filter(f => !f.name.includes('_sentinel'));
    const sentinelFields = allEntryFields.filter(f => f.name.includes('_sentinel'));
    
    console.log(`📝 一般欄位 (${regularFields.length} 個)：`);
    regularFields.forEach((field, index) => {
        console.log(`   ${index + 1}. ${field.name} (${field.type})`);
    });
    
    console.log(`\n🔒 內部驗證欄位 (${sentinelFields.length} 個)：`);
    sentinelFields.forEach((field, index) => {
        console.log(`   ${index + 1}. ${field.name} (${field.type})`);
    });
    
    // 生成完整的欄位列表
    console.log('\n═'.repeat(80));
    console.log('\n📝 完整的 entry 欄位列表（複製用）：\n');
    
    const allEntryNames = allEntryFields.map(f => f.name);
    console.log('const allEntryFields = [');
    allEntryNames.forEach((name, index) => {
        const comma = index < allEntryNames.length - 1 ? ',' : '';
        console.log(`    '${name}'${comma}`);
    });
    console.log('];');
    
    // 生成按順序的欄位對應（前8個）
    console.log('\n📝 按順序的欄位對應建議（前8個）：\n');
    
    const first8Fields = regularFields.slice(0, 8);
    if (first8Fields.length >= 8) {
        const fieldMapping = {
            companyName: first8Fields[0]?.name,
            contactPerson: first8Fields[1]?.name,
            email: first8Fields[2]?.name,
            phone: first8Fields[3]?.name,
            services: first8Fields[4]?.name,
            budget: first8Fields[5]?.name,
            timeline: first8Fields[6]?.name,
            requirements: first8Fields[7]?.name
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
    } else {
        console.log(`⚠️  只有 ${first8Fields.length} 個一般欄位，不足以對應所有表單欄位`);
    }
    
    console.log('\n═'.repeat(80));
    console.log('\n✅ 完成！所有 entry 欄位已列出');
    
    // 儲存結果到 window 物件
    window.allEntryResults = {
        allFields: allEntryFields,
        regularFields: regularFields,
        sentinelFields: sentinelFields,
        allEntryNames: allEntryNames,
        fieldMapping: first8Fields.length >= 8 ? {
            companyName: first8Fields[0]?.name,
            contactPerson: first8Fields[1]?.name,
            email: first8Fields[2]?.name,
            phone: first8Fields[3]?.name,
            services: first8Fields[4]?.name,
            budget: first8Fields[5]?.name,
            timeline: first8Fields[6]?.name,
            requirements: first8Fields[7]?.name
        } : null
    };
    
    console.log('\n💾 結果已儲存到 window.allEntryResults');
    console.log('   可以使用 console.log(window.allEntryResults) 查看詳細結果');
    
})();

// 輔助函數
function copyAllEntries() {
    if (window.allEntryResults && window.allEntryResults.allEntryNames) {
        const entriesText = window.allEntryResults.allEntryNames.join('\n');
        navigator.clipboard.writeText(entriesText).then(() => {
            console.log('✅ 所有 entry 欄位名稱已複製到剪貼簿！');
        }).catch(err => {
            console.error('❌ 複製失敗:', err);
        });
    } else {
        console.error('❌ 請先執行腳本');
    }
}

function copyFieldMapping() {
    if (window.allEntryResults && window.allEntryResults.fieldMapping) {
        const mapping = window.allEntryResults.fieldMapping;
        const code = `const fieldMapping = {
    companyName: '${mapping.companyName}',      // 公司名稱
    contactPerson: '${mapping.contactPerson}',    // 聯絡人姓名
    email: '${mapping.email}',            // 電子信箱
    phone: '${mapping.phone}',            // 聯絡電話
    services: '${mapping.services}',         // 感興趣的服務
    budget: '${mapping.budget}',           // 預算範圍
    timeline: '${mapping.timeline}',         // 期望完成時間
    requirements: '${mapping.requirements}'      // 詳細需求描述
};`;
        
        navigator.clipboard.writeText(code).then(() => {
            console.log('✅ 欄位對應程式碼已複製到剪貼簿！');
        }).catch(err => {
            console.error('❌ 複製失敗:', err);
        });
    } else {
        console.error('❌ 請先執行腳本或欄位數量不足');
    }
}

console.log('\n🔧 輔助函數已載入：');
console.log('- 執行 copyAllEntries() 複製所有 entry 欄位名稱');
console.log('- 執行 copyFieldMapping() 複製欄位對應程式碼');
