/**
 * 改進版 Console 測試代碼
 * 嘗試不同的提交方式
 */

(function() {
    console.log('🔧 載入改進版測試工具...');
    
    window.testImprovedSubmit = async function() {
        console.log('🚀 開始改進版提交測試...');
        
        const testData = {
            companyName: '測試公司',
            contactPerson: '測試人員', 
            email: 'test@example.com',
            phone: '0912345678',
            services: ['LLM強化 AI Line Bot'],
            budget: '10-50萬',
            timeline: '1-3個月',
            requirements: '這是改進版測試提交'
        };
        
        console.log('📋 測試數據:', testData);
        
        // 嘗試不同的提交方式
        const methods = [
            {
                name: '方法1: 基本 FormData',
                submitter: submitBasicFormData
            },
            {
                name: '方法2: URLSearchParams',
                submitter: submitURLSearchParams
            },
            {
                name: '方法3: 最小化數據',
                submitter: submitMinimalData
            }
        ];
        
        for (const method of methods) {
            console.log(`\n🔍 嘗試 ${method.name}...`);
            try {
                const result = await method.submitter(testData);
                console.log(`✅ ${method.name} 完成`);
                if (result.success) {
                    console.log('🎉 這個方法可能成功了！');
                }
            } catch (error) {
                console.log(`❌ ${method.name} 失敗:`, error.message);
            }
            console.log('─'.repeat(60));
            
            // 等待一秒再嘗試下一個方法
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log('\n📝 請檢查 Google Forms 回應頁面');
        console.log('🔗 https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/responses');
    };
    
    async function submitBasicFormData(data) {
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

        const formData = new FormData();
        formData.append(fieldMapping.companyName, data.companyName);
        formData.append(fieldMapping.contactPerson, data.contactPerson);
        formData.append(fieldMapping.email, data.email);
        formData.append(fieldMapping.phone, data.phone);
        formData.append(fieldMapping.budget, data.budget);
        formData.append(fieldMapping.timeline, data.timeline);
        formData.append(fieldMapping.requirements, data.requirements);
        
        if (data.services && Array.isArray(data.services)) {
            formData.append(`${fieldMapping.services}_sentinel`, '');
            data.services.forEach(service => {
                formData.append(fieldMapping.services, service);
            });
        }

        const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });

        return { success: true };
    }
    
    async function submitURLSearchParams(data) {
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

        const params = new URLSearchParams();
        params.append(fieldMapping.companyName, data.companyName);
        params.append(fieldMapping.contactPerson, data.contactPerson);
        params.append(fieldMapping.email, data.email);
        params.append(fieldMapping.phone, data.phone);
        params.append(fieldMapping.budget, data.budget);
        params.append(fieldMapping.timeline, data.timeline);
        params.append(fieldMapping.requirements, data.requirements);
        
        if (data.services && Array.isArray(data.services)) {
            params.append(`${fieldMapping.services}_sentinel`, '');
            data.services.forEach(service => {
                params.append(fieldMapping.services, service);
            });
        }

        const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        return { success: true };
    }
    
    async function submitMinimalData(data) {
        // 只提交最基本的欄位
        const params = new URLSearchParams();
        params.append('entry.1005380456', data.companyName);
        params.append('entry.1347829561', data.contactPerson);
        params.append('entry.1405852956', data.email);

        const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: params
        });

        return { success: true };
    }
    
    console.log('✅ 改進版測試工具已載入');
    console.log('📋 使用方法: 執行 testImprovedSubmit() 進行測試');
})();
