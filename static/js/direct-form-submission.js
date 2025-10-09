/**
 * 直接表單提交系統 - 修復版
 * 使用正確的 FormData 格式提交到 Google Forms
 */

class DirectFormSubmission {
    constructor() {
        this.formId = '1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ';
        this.submitUrl = `https://docs.google.com/forms/d/e/${this.formId}/formResponse`;
        
        // 實際的欄位映射
        this.fieldMapping = {
            companyName: 'entry.1716438352',      // 公司名稱
            contactPerson: 'entry.2095342285',    // 聯絡人姓名
            email: 'entry.1347829561',            // 電子信箱
            phone: 'entry.222074440',            // 聯絡電話
            services: 'entry.451838095',         // 感興趣的服務
            budget: 'entry.1405852956',           // 預算範圍
            timeline: 'entry.1005380456',         // 期望完成時間
            requirements: 'entry.1408160052'      // 詳細需求描述
        };
    }

    async submitForm(formData) {
        try {
            console.log('🚀 開始直接提交到 Google Forms...');
            console.log('表單數據:', formData);
            
            // 創建 FormData 對象
            const googleFormData = new FormData();
            
            // 添加基本欄位
            this.addBasicFields(googleFormData, formData);
            
            // 添加複選框欄位（特殊處理）
            this.addCheckboxFields(googleFormData, formData);
            
            // 添加必要的 sentinel 欄位
            this.addSentinelFields(googleFormData);
            
            // 顯示將要提交的數據
            this.logSubmitData(googleFormData);
            
            // 提交到 Google Forms
            const response = await fetch(this.submitUrl, {
                method: 'POST',
                mode: 'no-cors', // 必須使用 no-cors 模式
                body: googleFormData
            });
            
            console.log('✅ Google Forms 提交請求已發送');
            return { success: true, method: 'direct_google_forms' };
            
        } catch (error) {
            console.error('❌ 提交失敗:', error);
            throw error;
        }
    }

    addBasicFields(googleFormData, formData) {
        // 添加所有基本欄位
        googleFormData.append(this.fieldMapping.companyName, formData.companyName || '');
        googleFormData.append(this.fieldMapping.contactPerson, formData.contactPerson || '');
        googleFormData.append(this.fieldMapping.email, formData.email || '');
        googleFormData.append(this.fieldMapping.phone, formData.phone || '');
        googleFormData.append(this.fieldMapping.budget, formData.budget || '');
        googleFormData.append(this.fieldMapping.timeline, formData.timeline || '');
        googleFormData.append(this.fieldMapping.requirements, formData.requirements || '');
        
        console.log('📝 已添加基本欄位');
    }

    addCheckboxFields(googleFormData, formData) {
        if (formData.services && Array.isArray(formData.services) && formData.services.length > 0) {
            // 先添加 sentinel 欄位
            googleFormData.append(`${this.fieldMapping.services}_sentinel`, '');
            
            // 然後添加每個選項
            formData.services.forEach((service, index) => {
                googleFormData.append(this.fieldMapping.services, service);
                console.log(`📝 添加服務選項 ${index + 1}: ${service}`);
            });
        } else {
            console.log('⚠️  沒有選擇任何服務');
        }
    }

    addSentinelFields(googleFormData) {
        // 添加所有必要的 sentinel 欄位
        const sentinelFields = [
            'entry.1405852956_sentinel',
            'entry.1005380456_sentinel', 
            'entry.1408160052_sentinel'
        ];
        
        sentinelFields.forEach(sentinel => {
            googleFormData.append(sentinel, '');
        });
        
        console.log('🔒 已添加 sentinel 欄位');
    }

    logSubmitData(googleFormData) {
        console.log('\n📊 將要提交的數據:');
        console.log('─'.repeat(60));
        
        for (let [key, value] of googleFormData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        console.log('─'.repeat(60));
        console.log(`總共 ${Array.from(googleFormData.entries()).length} 個欄位\n`);
    }

    // 測試方法
    async testSubmission() {
        const testData = {
            companyName: '測試科技股份有限公司',
            contactPerson: '張三',
            email: 'test@example.com',
            phone: '02-1234-5678',
            services: ['LLM強化 AI Line Bot', '智能客服機器人'],
            budget: '10-50萬',
            timeline: '1-3個月',
            requirements: '這是測試提交，用於驗證表單功能。'
        };
        
        console.log('🧪 開始測試提交...');
        return await this.submitForm(testData);
    }
}

// 全域函數，方便調用
window.DirectFormSubmission = DirectFormSubmission;

// 創建全域實例
window.directFormSubmitter = new DirectFormSubmission();

console.log('🔧 直接表單提交系統已載入');
console.log('使用方法:');
console.log('1. window.directFormSubmitter.submitForm(formData) - 提交表單');
console.log('2. window.directFormSubmitter.testSubmission() - 測試提交');
