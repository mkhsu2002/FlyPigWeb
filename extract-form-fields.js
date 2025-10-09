/**
 * Google Forms 欄位提取腳本
 * 
 * 使用方法：
 * 1. 開啟 Google Forms: https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/viewform
 * 2. 按 F12 開啟開發者工具
 * 3. 切換到 Console 標籤
 * 4. 複製並貼上此腳本的全部內容
 * 5. 按 Enter 執行
 * 6. 查看輸出的欄位名稱
 */

(function() {
    console.log('🔍 開始提取 Google Forms 欄位名稱...\n');
    
    // 找到所有 input, textarea, select 欄位
    const fields = document.querySelectorAll('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
    
    if (fields.length === 0) {
        console.error('❌ 找不到任何 entry 欄位！');
        console.log('💡 請確認：');
        console.log('1. 您是否在 Google Forms 的 viewform 頁面？');
        console.log('2. 表單是否已完全載入？');
        return;
    }
    
    console.log(`✅ 找到 ${fields.length} 個欄位\n`);
    console.log('═'.repeat(80));
    
    const fieldMapping = {};
    const fieldList = [];
    
    fields.forEach((field, index) => {
        const name = field.name;
        const type = field.type || field.tagName.toLowerCase();
        
        // 嘗試找到欄位標籤
        let label = '';
        const container = field.closest('[role="listitem"]') || field.closest('div[data-params]');
        if (container) {
            const labelElement = container.querySelector('[role="heading"]') || 
                                container.querySelector('.freebirdFormviewerComponentsQuestionBaseTitle') ||
                                container.querySelector('label');
            if (labelElement) {
                label = labelElement.textContent.trim();
            }
        }
        
        // 如果是複選框，獲取 value
        let value = '';
        if (type === 'checkbox') {
            value = field.value;
        }
        
        const fieldInfo = {
            index: index + 1,
            name: name,
            type: type,
            label: label,
            value: value
        };
        
        fieldList.push(fieldInfo);
        
        console.log(`${index + 1}. ${name}`);
        console.log(`   類型: ${type}`);
        console.log(`   標籤: ${label || '(未找到標籤)'}`);
        if (value) {
            console.log(`   值: ${value}`);
        }
        console.log('─'.repeat(80));
    });
    
    console.log('\n📋 欄位對應建議：\n');
    
    // 智能推測欄位對應
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
    
    console.log('根據標籤自動推測的欄位對應：\n');
    Object.entries(suggestions).forEach(([key, value]) => {
        console.log(`${key}: ${value || '(未找到)'}`);
    });
    
    console.log('\n═'.repeat(80));
    console.log('\n📝 JavaScript 程式碼（複製此段）：\n');
    
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
    console.log('\n✅ 提取完成！');
    console.log('\n💡 下一步：');
    console.log('1. 複製上面的 JavaScript 程式碼');
    console.log('2. 告訴開發者這些欄位名稱');
    console.log('3. 開發者會更新系統代碼');
    
    // 將結果存到 window 物件，方便後續使用
    window.extractedFields = {
        fields: fieldList,
        suggestions: suggestions,
        code: code
    };
    
    console.log('\n💾 結果已儲存到 window.extractedFields');
    console.log('   可以使用 console.log(window.extractedFields) 查看');
    
})();

// 額外的輔助函數
console.log('\n🔧 輔助函數已載入：');
console.log('- 執行 copyFieldMapping() 可以複製欄位對應程式碼到剪貼簿');

function copyFieldMapping() {
    if (window.extractedFields && window.extractedFields.code) {
        navigator.clipboard.writeText(window.extractedFields.code).then(() => {
            console.log('✅ 欄位對應程式碼已複製到剪貼簿！');
        }).catch(err => {
            console.error('❌ 複製失敗:', err);
            console.log('請手動複製上面的程式碼');
        });
    } else {
        console.error('❌ 請先執行欄位提取腳本');
    }
}
