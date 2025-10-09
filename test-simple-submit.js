/**
 * 簡化版表單提交測試
 */

// 全域函數，可以直接在 Console 中調用
window.testSimpleSubmit = async function() {
    console.log('🧪 開始簡化版提交測試...');
    
    // 測試數據
    const testData = {
        companyName: '測試公司',
        contactPerson: '測試人員',
        email: 'test@example.com',
        phone: '0912345678',
        services: ['LLM強化 AI Line Bot'],
        budget: '10-50萬',
        timeline: '1-3個月',
        requirements: '這是測試提交'
    };
    
    console.log('測試數據:', testData);
    
    try {
        // 使用正確的欄位映射
        const fieldMapping = {
            companyName: 'entry.1005380456',
            contactPerson: 'entry.1347829561',
            email: 'entry.1405852956',
            phone: 'entry.1408160052',
            services: 'entry.1716438352',
            budget: 'entry.2095342285',
            timeline: 'entry.222074440',
            requirements: 'entry.451838095'
        };

        const googleFormData = new FormData();
        
        // 添加基本欄位
        googleFormData.append(fieldMapping.companyName, testData.companyName);
        googleFormData.append(fieldMapping.contactPerson, testData.contactPerson);
        googleFormData.append(fieldMapping.email, testData.email);
        googleFormData.append(fieldMapping.phone, testData.phone);
        googleFormData.append(fieldMapping.budget, testData.budget);
        googleFormData.append(fieldMapping.timeline, testData.timeline);
        googleFormData.append(fieldMapping.requirements, testData.requirements);
        
        // 處理複選框服務
        if (testData.services && Array.isArray(testData.services)) {
            // 添加 sentinel 欄位
            googleFormData.append(`${fieldMapping.services}_sentinel`, '');
            // 添加每個選項
            testData.services.forEach(service => {
                googleFormData.append(fieldMapping.services, service);
            });
        }

        // 顯示提交數據
        console.log('📊 將要提交的數據:');
        console.log('─'.repeat(60));
        for (let [key, value] of googleFormData.entries()) {
            console.log(`${key}: ${value}`);
        }
        console.log('─'.repeat(60));

        // 提交到 Google Forms
        console.log('🚀 開始提交到 Google Forms...');
        
        const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: googleFormData
        });

        console.log('✅ 提交請求已發送');
        console.log('📝 請檢查 Google Forms 回應頁面是否收到數據');
        
        return { success: true };
        
    } catch (error) {
        console.error('❌ 提交失敗:', error);
        return { success: false, error: error.message };
    }
};

console.log('🔧 簡化版提交測試已載入');
console.log('使用方法: 執行 testSimpleSubmit() 進行測試');
