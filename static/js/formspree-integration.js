/**
 * Formspree 整合 - 簡單可靠的表單提交服務
 * 使用 Formspree.io 自動發送 Email
 */

class FormspreeIntegration {
    constructor() {
        this.endpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // 需要替換為實際的 Form ID
        this.email = 'flypig@icareu.tw';
    }

    async submitForm(formData) {
        try {
            console.log('📧 開始 Formspree 提交...');
            console.log('表單數據:', formData);

            const submitData = {
                _replyto: formData.email || '',
                _subject: `FlyPig AI 業務洽詢 - ${formData.companyName || '未知公司'}`,
                _cc: formData.email || '', // 副本給用戶
                
                // 表單欄位
                company_name: formData.companyName || '',
                contact_person: formData.contactPerson || '',
                email: formData.email || '',
                phone: formData.phone || '',
                services: Array.isArray(formData.services) ? formData.services.join(', ') : formData.services || '',
                budget: formData.budget || '',
                timeline: formData.timeline || '',
                requirements: formData.requirements || '',
                
                // 額外資訊
                submit_time: new Date().toLocaleString('zh-TW'),
                source_url: window.location.href,
                user_agent: navigator.userAgent
            };

            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                console.log('✅ Formspree 提交成功');
                return { success: true, response };
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

        } catch (error) {
            console.error('❌ Formspree 提交失敗:', error);
            throw error;
        }
    }

    // 驗證表單數據
    validateFormData(formData) {
        const errors = [];
        
        if (!formData.companyName || formData.companyName.trim() === '') {
            errors.push('公司名稱為必填欄位');
        }
        
        if (!formData.contactPerson || formData.contactPerson.trim() === '') {
            errors.push('聯絡人姓名為必填欄位');
        }
        
        if (!formData.email || formData.email.trim() === '') {
            errors.push('電子信箱為必填欄位');
        } else if (!this.isValidEmail(formData.email)) {
            errors.push('請輸入有效的電子信箱');
        }
        
        if (!formData.phone || formData.phone.trim() === '') {
            errors.push('聯絡電話為必填欄位');
        }
        
        if (!formData.budget || formData.budget === '') {
            errors.push('預算範圍為必填欄位');
        }
        
        if (!formData.timeline || formData.timeline === '') {
            errors.push('期望完成時間為必填欄位');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// 創建全域實例
window.formspreeIntegration = new FormspreeIntegration();

console.log('📧 Formspree 整合已載入');
console.log('使用方法: window.formspreeIntegration.submitForm(formData)');
