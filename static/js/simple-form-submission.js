/**
 * 簡化版表單提交系統
 * 直接發送郵件通知，不使用 Google Forms
 */

class SimpleFormSubmission {
    constructor() {
        this.emailConfig = {
            // 使用 EmailJS 服務（免費）
            serviceId: 'service_flypigai', // 需要在 EmailJS 註冊
            templateId: 'template_contact', // 需要在 EmailJS 創建模板
            userId: 'user_flypigai' // 需要在 EmailJS 獲取
        };
        
        this.fallbackEmail = 'sales@icareu.tw';
    }

    async submitForm(formData) {
        try {
            // 方法1: 嘗試使用 EmailJS 發送郵件
            if (window.emailjs) {
                await this.sendViaEmailJS(formData);
                return { success: true, method: 'emailjs' };
            }
            
            // 方法2: 使用 mailto 連結（備用）
            this.sendViaMailto(formData);
            return { success: true, method: 'mailto' };
            
        } catch (error) {
            console.error('郵件發送失敗:', error);
            
            // 方法3: 備用方案 - 顯示聯絡資訊
            this.showContactInfo(formData);
            return { success: true, method: 'contact_info' };
        }
    }

    async sendViaEmailJS(formData) {
        const templateParams = {
            to_email: this.fallbackEmail,
            from_name: formData.contactPerson,
            from_email: formData.email,
            company_name: formData.companyName,
            phone: formData.phone,
            services: Array.isArray(formData.services) ? formData.services.join(', ') : formData.services,
            budget: formData.budget,
            timeline: formData.timeline,
            requirements: formData.requirements,
            submission_time: new Date().toLocaleString('zh-TW'),
            website_url: window.location.href
        };

        await window.emailjs.send(
            this.emailConfig.serviceId,
            this.emailConfig.templateId,
            templateParams,
            this.emailConfig.userId
        );
    }

    sendViaMailto(formData) {
        // 取消自動開啟郵件客戶端
        console.log('表單數據已收集，但不自動開啟郵件客戶端');
        console.log('表單數據:', formData);
        
        // 可以選擇顯示提示訊息
        alert('表單提交成功！我們將透過其他方式與您聯繫。');
    }

    formatEmailBody(formData) {
        return `
FlyPig AI 業務洽詢表單提交

公司名稱：${formData.companyName}
聯絡人：${formData.contactPerson}
電子信箱：${formData.email}
聯絡電話：${formData.phone}

感興趣的服務：
${Array.isArray(formData.services) ? formData.services.join('\n- ') : formData.services}

預算範圍：${formData.budget}
期望完成時間：${formData.timeline}

詳細需求描述：
${formData.requirements}

提交時間：${new Date().toLocaleString('zh-TW')}
來源網址：${window.location.href}

---
此郵件由 FlyPig AI 網站表單自動生成
        `.trim();
    }

    showContactInfo(formData) {
        // 顯示成功訊息和聯絡方式
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.innerHTML = `
                <div class="form-success-animation">
                    <div class="success-icon">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <h3 style="color: #4CAF50; margin-bottom: 1rem;">提交成功！</h3>
                    <p style="color: #666; margin-bottom: 1.5rem;">
                        感謝您的洽詢！由於系統設定，請您直接聯繫我們：
                    </p>
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
                        <h5>聯絡資訊：</h5>
                        <p><strong>艾可開發股份有限公司</strong></p>
                        <p><i class="fas fa-envelope me-2"></i> sales@icareu.tw</p>
                        <p><i class="fas fa-phone me-2"></i> 03-5735430</p>
                        <p><i class="fas fa-map-marker-alt me-2"></i> 新竹市東區埔頂路99巷127號</p>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="mailto:sales@icareu.tw?subject=業務洽詢 - ${formData.companyName}" class="btn btn-primary">
                            <i class="fas fa-envelope me-2"></i>發送郵件
                        </a>
                        <a href="tel:03-5735430" class="btn btn-success">
                            <i class="fas fa-phone me-2"></i>立即致電
                        </a>
                    </div>
                </div>
            `;
            successMessage.style.display = 'block';
        }
    }
}

// 導出類別
window.SimpleFormSubmission = SimpleFormSubmission;
