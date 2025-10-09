/**
 * Google Forms 欄位名稱檢查工具
 * 用於獲取實際的 entry 欄位名稱
 */

class GoogleFormsHelper {
    constructor() {
        this.formId = '1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ';
    }

    /**
     * 檢查 Google Forms 的實際欄位結構
     */
    async inspectFormFields() {
        try {
            // 嘗試獲取表單的 HTML 結構
            const formUrl = `https://docs.google.com/forms/d/e/${this.formId}/viewform`;
            const response = await fetch(formUrl);
            const html = await response.text();
            
            // 解析 HTML 尋找 input 欄位的 name 屬性
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const inputs = doc.querySelectorAll('input[name], textarea[name], select[name]');
            
            console.log('🔍 找到的 Google Forms 欄位:');
            inputs.forEach((input, index) => {
                console.log(`${index + 1}. ${input.name}: ${input.type || input.tagName.toLowerCase()}`);
            });
            
            return Array.from(inputs).map(input => input.name);
            
        } catch (error) {
            console.error('檢查 Google Forms 欄位失敗:', error);
            return null;
        }
    }

    /**
     * 使用 iframe 方式檢查表單欄位
     */
    inspectFormFieldsViaIframe() {
        return new Promise((resolve) => {
            // 創建隱藏的 iframe
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = `https://docs.google.com/forms/d/e/${this.formId}/viewform`;
            
            iframe.onload = () => {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    const inputs = iframeDoc.querySelectorAll('input[name], textarea[name], select[name]');
                    
                    const fields = Array.from(inputs).map(input => ({
                        name: input.name,
                        type: input.type || input.tagName.toLowerCase(),
                        required: input.hasAttribute('required')
                    }));
                    
                    console.log('🔍 透過 iframe 找到的欄位:', fields);
                    resolve(fields);
                } catch (error) {
                    console.error('iframe 檢查失敗:', error);
                    resolve(null);
                }
                
                // 清理 iframe
                document.body.removeChild(iframe);
            };
            
            document.body.appendChild(iframe);
        });
    }

    /**
     * 基於常見的 Google Forms 欄位命名規則，推測欄位名稱
     */
    getEstimatedFieldNames() {
        // 根據 Google Forms 的常見命名規則
        // 通常格式為 entry.XXXXXXXXXX，其中 X 是數字
        return {
            'entry.1000000': 'companyName',      // 公司名稱
            'entry.1000001': 'contactPerson',    // 聯絡人姓名
            'entry.1000002': 'email',            // 電子信箱
            'entry.1000003': 'phone',            // 聯絡電話
            'entry.1000004': 'services',         // 感興趣的服務（複選框）
            'entry.1000005': 'budget',           // 預算範圍
            'entry.1000006': 'timeline',         // 期望完成時間
            'entry.1000007': 'requirements'      // 詳細需求描述
        };
    }

    /**
     * 測試表單提交
     */
    async testFormSubmission(testData) {
        const estimatedFields = this.getEstimatedFieldNames();
        const submitUrl = `https://docs.google.com/forms/d/e/${this.formId}/formResponse`;
        
        const formData = new FormData();
        
        // 使用估計的欄位名稱
        Object.entries(estimatedFields).forEach(([fieldName, dataKey]) => {
            if (testData[dataKey] !== undefined) {
                if (dataKey === 'services' && Array.isArray(testData[dataKey])) {
                    // 處理複選框
                    testData[dataKey].forEach((service, index) => {
                        formData.append(`${fieldName}_${index}`, service);
                    });
                } else {
                    formData.append(fieldName, testData[dataKey]);
                }
            }
        });
        
        try {
            const response = await fetch(submitUrl, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            
            console.log('✅ 測試提交成功');
            return true;
        } catch (error) {
            console.error('❌ 測試提交失敗:', error);
            return false;
        }
    }
}

// 全域函數，方便在控制台調用
window.inspectGoogleForms = () => {
    const helper = new GoogleFormsHelper();
    return helper.inspectFormFields();
};

window.inspectGoogleFormsIframe = () => {
    const helper = new GoogleFormsHelper();
    return helper.inspectFormFieldsViaIframe();
};

window.testGoogleFormsSubmission = (testData = {
    companyName: '測試公司',
    contactPerson: '測試人員',
    email: 'test@example.com',
    phone: '02-1234-5678',
    services: ['LLM強化 AI Line Bot'],
    budget: '10-50萬',
    timeline: '1-3個月',
    requirements: '這是一個測試提交'
}) => {
    const helper = new GoogleFormsHelper();
    return helper.testFormSubmission(testData);
};

// 導出類別
window.GoogleFormsHelper = GoogleFormsHelper;
