/**
 * 測試 Google Forms 提交格式
 * 
 * 使用方法：
 * 1. 開啟 Google Forms: https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/viewform
 * 2. 按 F12 開啟開發者工具
 * 3. 切換到 Console 標籤
 * 4. 複製並貼上此腳本的全部內容
 * 5. 按 Enter 執行
 */

(function() {
    console.log('🧪 測試 Google Forms 提交格式\n');
    console.log('═'.repeat(80));
    
    // 測試數據
    const testData = {
        companyName: '測試公司',
        contactPerson: '測試人員',
        email: 'test@example.com',
        phone: '02-1234-5678',
        services: ['LLM強化 AI Line Bot', '智能客服機器人'],
        budget: '10-50萬',
        timeline: '1-3個月',
        requirements: '這是測試提交'
    };
    
    console.log('📋 測試數據：');
    console.log(JSON.stringify(testData, null, 2));
    console.log('\n');
    
    // 測試不同的提交格式
    testSubmissionFormats(testData);
    
    async function testSubmissionFormats(data) {
        const formats = [
            {
                name: '格式1: 基本 FormData',
                submitter: submitBasicFormData
            },
            {
                name: '格式2: URLSearchParams',
                submitter: submitURLSearchParams
            },
            {
                name: '格式3: 包含 sentinel 欄位',
                submitter: submitWithSentinel
            },
            {
                name: '格式4: 複選框特殊處理',
                submitter: submitCheckboxSpecial
            }
        ];
        
        for (const format of formats) {
            console.log(`\n🔍 測試 ${format.name}...\n`);
            try {
                const result = await format.submitter(data);
                console.log(`✅ ${format.name} 提交完成`);
                console.log('提交數據:', result.submitData);
            } catch (error) {
                console.log(`❌ ${format.name} 提交失敗:`, error.message);
            }
            console.log('─'.repeat(60));
            
            // 等待一秒再測試下一個格式
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log('\n═'.repeat(80));
        console.log('\n💡 請檢查 Google Forms 回應頁面，看看哪個格式成功提交了數據');
        console.log('回應頁面: https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/responses');
    }
    
    async function submitBasicFormData(data) {
        const fieldMapping = {
            companyName: 'entry.1716438352',
            contactPerson: 'entry.2095342285',
            email: 'entry.1347829561',
            phone: 'entry.222074440',
            services: 'entry.451838095',
            budget: 'entry.1405852956',
            timeline: 'entry.1005380456',
            requirements: 'entry.1408160052'
        };
        
        const formData = new FormData();
        formData.append(fieldMapping.companyName, data.companyName);
        formData.append(fieldMapping.contactPerson, data.contactPerson);
        formData.append(fieldMapping.email, data.email);
        formData.append(fieldMapping.phone, data.phone);
        formData.append(fieldMapping.budget, data.budget);
        formData.append(fieldMapping.timeline, data.timeline);
        formData.append(fieldMapping.requirements, data.requirements);
        
        // 處理複選框
        if (data.services && Array.isArray(data.services)) {
            data.services.forEach(service => {
                formData.append(fieldMapping.services, service);
            });
        }
        
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
        
        return { submitData: Array.from(formData.entries()) };
    }
    
    async function submitURLSearchParams(data) {
        const fieldMapping = {
            companyName: 'entry.1716438352',
            contactPerson: 'entry.2095342285',
            email: 'entry.1347829561',
            phone: 'entry.222074440',
            services: 'entry.451838095',
            budget: 'entry.1405852956',
            timeline: 'entry.1005380456',
            requirements: 'entry.1408160052'
        };
        
        const params = new URLSearchParams();
        params.append(fieldMapping.companyName, data.companyName);
        params.append(fieldMapping.contactPerson, data.contactPerson);
        params.append(fieldMapping.email, data.email);
        params.append(fieldMapping.phone, data.phone);
        params.append(fieldMapping.budget, data.budget);
        params.append(fieldMapping.timeline, data.timeline);
        params.append(fieldMapping.requirements, data.requirements);
        
        // 處理複選框
        if (data.services && Array.isArray(data.services)) {
            data.services.forEach(service => {
                params.append(fieldMapping.services, service);
            });
        }
        
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        
        return { submitData: Array.from(params.entries()) };
    }
    
    async function submitWithSentinel(data) {
        const fieldMapping = {
            companyName: 'entry.1716438352',
            contactPerson: 'entry.2095342285',
            email: 'entry.1347829561',
            phone: 'entry.222074440',
            services: 'entry.451838095',
            budget: 'entry.1405852956',
            timeline: 'entry.1005380456',
            requirements: 'entry.1408160052'
        };
        
        const formData = new FormData();
        formData.append(fieldMapping.companyName, data.companyName);
        formData.append(fieldMapping.contactPerson, data.contactPerson);
        formData.append(fieldMapping.email, data.email);
        formData.append(fieldMapping.phone, data.phone);
        formData.append(fieldMapping.budget, data.budget);
        formData.append(fieldMapping.timeline, data.timeline);
        formData.append(fieldMapping.requirements, data.requirements);
        
        // 添加所有 sentinel 欄位
        formData.append('entry.1405852956_sentinel', '');
        formData.append('entry.1005380456_sentinel', '');
        formData.append('entry.1408160052_sentinel', '');
        formData.append('entry.451838095_sentinel', '');
        
        // 處理複選框
        if (data.services && Array.isArray(data.services)) {
            data.services.forEach(service => {
                formData.append(fieldMapping.services, service);
            });
        }
        
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
        
        return { submitData: Array.from(formData.entries()) };
    }
    
    async function submitCheckboxSpecial(data) {
        const fieldMapping = {
            companyName: 'entry.1716438352',
            contactPerson: 'entry.2095342285',
            email: 'entry.1347829561',
            phone: 'entry.222074440',
            services: 'entry.451838095',
            budget: 'entry.1405852956',
            timeline: 'entry.1005380456',
            requirements: 'entry.1408160052'
        };
        
        const formData = new FormData();
        
        // 基本欄位
        formData.append(fieldMapping.companyName, data.companyName);
        formData.append(fieldMapping.contactPerson, data.contactPerson);
        formData.append(fieldMapping.email, data.email);
        formData.append(fieldMapping.phone, data.phone);
        formData.append(fieldMapping.budget, data.budget);
        formData.append(fieldMapping.timeline, data.timeline);
        formData.append(fieldMapping.requirements, data.requirements);
        
        // 複選框特殊處理 - 先添加 sentinel，再添加選項
        if (data.services && Array.isArray(data.services)) {
            // 添加 sentinel 欄位
            formData.append('entry.451838095_sentinel', '');
            
            // 添加每個選項
            data.services.forEach(service => {
                formData.append(fieldMapping.services, service);
            });
        }
        
        // 添加其他 sentinel 欄位
        formData.append('entry.1405852956_sentinel', '');
        formData.append('entry.1005380456_sentinel', '');
        formData.append('entry.1408160052_sentinel', '');
        
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });
        
        return { submitData: Array.from(formData.entries()) };
    }
    
    // 額外的調試函數
    window.testGoogleFormsSubmission = async function(customData = null) {
        const data = customData || testData;
        console.log('🧪 自定義測試提交...');
        
        try {
            const result = await submitCheckboxSpecial(data);
            console.log('✅ 自定義測試完成');
            console.log('提交數據:', result.submitData);
        } catch (error) {
            console.error('❌ 自定義測試失敗:', error);
        }
    };
    
    console.log('\n🔧 額外功能已載入：');
    console.log('- 執行 testGoogleFormsSubmission(customData) 進行自定義測試');
    
})();
