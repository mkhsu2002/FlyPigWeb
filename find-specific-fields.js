/**
 * 針對特定欄位標籤的搜尋腳本
 * 
 * 目標欄位：
 * - 公司名稱
 * - 聯絡人姓名
 * - 電子信箱
 * - 聯絡電話
 * - 感興趣的服務（可複選）
 * - 預算範圍
 * - 期望完成時間
 * - 詳細需求描述
 */

(function() {
    console.log('🎯 搜尋特定欄位標籤的對應 entry 名稱\n');
    console.log('═'.repeat(80));
    
    const targetLabels = [
        '公司名稱',
        '聯絡人姓名', 
        '電子信箱',
        '聯絡電話',
        '感興趣的服務（可複選）',
        '感興趣的服務',
        '預算範圍',
        '期望完成時間',
        '詳細需求描述'
    ];
    
    console.log('🔍 搜尋目標標籤：');
    targetLabels.forEach((label, index) => {
        console.log(`${index + 1}. ${label}`);
    });
    console.log('\n');
    
    // 搜尋所有可能的元素
    const allElements = document.querySelectorAll('*');
    const foundFields = [];
    
    console.log('📋 開始掃描頁面元素...\n');
    
    allElements.forEach(element => {
        // 檢查元素是否包含目標標籤
        const elementText = element.textContent || '';
        const innerHTML = element.innerHTML || '';
        
        targetLabels.forEach(targetLabel => {
            if (elementText.includes(targetLabel) || innerHTML.includes(targetLabel)) {
                // 檢查這個元素附近是否有 entry 欄位
                const nearbyEntry = findNearbyEntry(element);
                if (nearbyEntry) {
                    foundFields.push({
                        label: targetLabel,
                        entryName: nearbyEntry.name,
                        element: nearbyEntry,
                        context: elementText.substring(0, 100)
                    });
                }
            }
        });
    });
    
    // 去重複
    const uniqueFields = foundFields.filter((field, index, self) => 
        index === self.findIndex(f => f.entryName === field.entryName)
    );
    
    console.log(`✅ 找到 ${uniqueFields.length} 個匹配的欄位：\n`);
    console.log('─'.repeat(80));
    
    if (uniqueFields.length === 0) {
        console.log('❌ 沒有找到匹配的欄位，嘗試其他方法...\n');
        tryAlternativeSearch();
        return;
    }
    
    uniqueFields.forEach((field, index) => {
        console.log(`${index + 1}. ${field.label}`);
        console.log(`   Entry: ${field.entryName}`);
        console.log(`   類型: ${field.element.type || field.element.tagName}`);
        console.log(`   上下文: ${field.context}...`);
        console.log('─'.repeat(80));
    });
    
    // 生成欄位對應
    generateFieldMapping(uniqueFields);
    
    function findNearbyEntry(element) {
        // 在當前元素中搜尋
        let entry = element.querySelector('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
        if (entry && !entry.name.includes('_sentinel')) {
            return entry;
        }
        
        // 在父元素中搜尋
        let parent = element.parentElement;
        let depth = 0;
        while (parent && depth < 5) {
            entry = parent.querySelector('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
            if (entry && !entry.name.includes('_sentinel')) {
                return entry;
            }
            parent = parent.parentElement;
            depth++;
        }
        
        // 在兄弟元素中搜尋
        let sibling = element.nextElementSibling;
        depth = 0;
        while (sibling && depth < 3) {
            entry = sibling.querySelector('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
            if (entry && !entry.name.includes('_sentinel')) {
                return entry;
            }
            sibling = sibling.nextElementSibling;
            depth++;
        }
        
        return null;
    }
    
    function tryAlternativeSearch() {
        console.log('🔧 嘗試替代搜尋方法...\n');
        
        // 搜尋所有 entry 欄位
        const allEntryFields = document.querySelectorAll('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]');
        const validEntries = Array.from(allEntryFields).filter(field => !field.name.includes('_sentinel'));
        
        console.log(`📝 找到 ${validEntries.length} 個有效的 entry 欄位：\n`);
        
        validEntries.forEach((field, index) => {
            console.log(`${index + 1}. ${field.name}`);
            console.log(`   類型: ${field.type || field.tagName}`);
            
            // 嘗試找到附近的標籤
            const nearbyLabel = findNearbyLabel(field);
            console.log(`   附近標籤: ${nearbyLabel || '(未找到)'}`);
            console.log('─'.repeat(80));
        });
        
        // 基於順序推測
        if (validEntries.length >= 8) {
            console.log('\n🎯 基於順序的欄位對應推測：\n');
            const fieldMapping = {
                '公司名稱': validEntries[0]?.name,
                '聯絡人姓名': validEntries[1]?.name,
                '電子信箱': validEntries[2]?.name,
                '聯絡電話': validEntries[3]?.name,
                '感興趣的服務': validEntries[4]?.name,
                '預算範圍': validEntries[5]?.name,
                '期望完成時間': validEntries[6]?.name,
                '詳細需求描述': validEntries[7]?.name
            };
            
            Object.entries(fieldMapping).forEach(([label, entryName]) => {
                console.log(`${label}: ${entryName || '(未找到)'}`);
            });
            
            console.log('\n📝 生成的程式碼：\n');
            const code = `const fieldMapping = {
    companyName: '${fieldMapping['公司名稱'] || 'entry.XXXXXXXXXX'}',      // 公司名稱
    contactPerson: '${fieldMapping['聯絡人姓名'] || 'entry.XXXXXXXXXX'}',    // 聯絡人姓名
    email: '${fieldMapping['電子信箱'] || 'entry.XXXXXXXXXX'}',            // 電子信箱
    phone: '${fieldMapping['聯絡電話'] || 'entry.XXXXXXXXXX'}',            // 聯絡電話
    services: '${fieldMapping['感興趣的服務'] || 'entry.XXXXXXXXXX'}',         // 感興趣的服務
    budget: '${fieldMapping['預算範圍'] || 'entry.XXXXXXXXXX'}',           // 預算範圍
    timeline: '${fieldMapping['期望完成時間'] || 'entry.XXXXXXXXXX'}',         // 期望完成時間
    requirements: '${fieldMapping['詳細需求描述'] || 'entry.XXXXXXXXXX'}'      // 詳細需求描述
};`;
            
            console.log(code);
        }
    }
    
    function findNearbyLabel(field) {
        // 向上搜尋標籤
        let parent = field.parentElement;
        let depth = 0;
        while (parent && depth < 5) {
            const text = parent.textContent || '';
            const foundLabel = targetLabels.find(label => text.includes(label));
            if (foundLabel) {
                return foundLabel;
            }
            parent = parent.parentElement;
            depth++;
        }
        
        // 向前搜尋標籤
        let prevSibling = field.previousElementSibling;
        depth = 0;
        while (prevSibling && depth < 3) {
            const text = prevSibling.textContent || '';
            const foundLabel = targetLabels.find(label => text.includes(label));
            if (foundLabel) {
                return foundLabel;
            }
            prevSibling = prevSibling.previousElementSibling;
            depth++;
        }
        
        return null;
    }
    
    function generateFieldMapping(fields) {
        console.log('\n🎯 生成欄位對應：\n');
        
        const mapping = {
            '公司名稱': null,
            '聯絡人姓名': null,
            '電子信箱': null,
            '聯絡電話': null,
            '感興趣的服務': null,
            '預算範圍': null,
            '期望完成時間': null,
            '詳細需求描述': null
        };
        
        fields.forEach(field => {
            if (field.label.includes('公司')) {
                mapping['公司名稱'] = field.entryName;
            } else if (field.label.includes('聯絡人') || field.label.includes('姓名')) {
                mapping['聯絡人姓名'] = field.entryName;
            } else if (field.label.includes('信箱')) {
                mapping['電子信箱'] = field.entryName;
            } else if (field.label.includes('電話')) {
                mapping['聯絡電話'] = field.entryName;
            } else if (field.label.includes('服務')) {
                mapping['感興趣的服務'] = field.entryName;
            } else if (field.label.includes('預算')) {
                mapping['預算範圍'] = field.entryName;
            } else if (field.label.includes('時間')) {
                mapping['期望完成時間'] = field.entryName;
            } else if (field.label.includes('需求') || field.label.includes('描述')) {
                mapping['詳細需求描述'] = field.entryName;
            }
        });
        
        console.log('📋 欄位對應結果：\n');
        Object.entries(mapping).forEach(([label, entryName]) => {
            console.log(`${label}: ${entryName || '(未找到)'}`);
        });
        
        console.log('\n═'.repeat(80));
        console.log('\n📝 生成的程式碼：\n');
        
        const code = `const fieldMapping = {
    companyName: '${mapping['公司名稱'] || 'entry.XXXXXXXXXX'}',      // 公司名稱
    contactPerson: '${mapping['聯絡人姓名'] || 'entry.XXXXXXXXXX'}',    // 聯絡人姓名
    email: '${mapping['電子信箱'] || 'entry.XXXXXXXXXX'}',            // 電子信箱
    phone: '${mapping['聯絡電話'] || 'entry.XXXXXXXXXX'}',            // 聯絡電話
    services: '${mapping['感興趣的服務'] || 'entry.XXXXXXXXXX'}',         // 感興趣的服務
    budget: '${mapping['預算範圍'] || 'entry.XXXXXXXXXX'}',           // 預算範圍
    timeline: '${mapping['期望完成時間'] || 'entry.XXXXXXXXXX'}',         // 期望完成時間
    requirements: '${mapping['詳細需求描述'] || 'entry.XXXXXXXXXX'}'      // 詳細需求描述
};`;
        
        console.log(code);
        
        console.log('\n═'.repeat(80));
        console.log('\n✅ 搜尋完成！');
        
        // 儲存結果
        window.specificFieldResults = {
            fields: fields,
            mapping: mapping,
            code: code
        };
        
        console.log('\n💾 結果已儲存到 window.specificFieldResults');
    }
})();

// 輔助函數
function copySpecificFieldMapping() {
    if (window.specificFieldResults && window.specificFieldResults.code) {
        navigator.clipboard.writeText(window.specificFieldResults.code).then(() => {
            console.log('✅ 欄位對應程式碼已複製到剪貼簿！');
        }).catch(err => {
            console.error('❌ 複製失敗:', err);
        });
    } else {
        console.error('❌ 請先執行搜尋腳本');
    }
}

console.log('\n🔧 輔助函數已載入：');
console.log('- 執行 copySpecificFieldMapping() 可以複製欄位對應程式碼到剪貼簿');
