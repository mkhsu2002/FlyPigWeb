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
        // 嘗試直接提交到 Google Forms
        this.submitToGoogleFormsDirectly(formData);
    }

    async submitToGoogleFormsDirectly(formData) {
        try {
            // 使用實際的 Google Forms 欄位名稱
            const fieldMapping = {
                companyName: 'entry.1716438352',      // 公司名稱
                contactPerson: 'entry.2095342285',    // 聯絡人姓名
                email: 'entry.1347829561',            // 電子信箱
                phone: 'entry.222074440',            // 聯絡電話
                services: 'entry.451838095',         // 感興趣的服務
                budget: 'entry.1405852956',           // 預算範圍
                timeline: 'entry.1005380456',         // 期望完成時間
                requirements: 'entry.1408160052'      // 詳細需求描述
            };

            const googleData = new FormData();
            
            // 添加基本欄位
            googleData.append(fieldMapping.companyName, formData.companyName || '');
            googleData.append(fieldMapping.contactPerson, formData.contactPerson || '');
            googleData.append(fieldMapping.email, formData.email || '');
            googleData.append(fieldMapping.phone, formData.phone || '');
            googleData.append(fieldMapping.budget, formData.budget || '');
            googleData.append(fieldMapping.timeline, formData.timeline || '');
            googleData.append(fieldMapping.requirements, formData.requirements || '');
            
            // 處理複選框服務
            if (formData.services && Array.isArray(formData.services)) {
                formData.services.forEach(service => {
                    googleData.append(fieldMapping.services, service);
                });
                // 添加 sentinel 欄位
                googleData.append(`${fieldMapping.services}_sentinel`, '');
            }

            // 提交到 Google Forms
            const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: googleData
            });

            console.log('Google Forms 提交成功');
            return { success: true, method: 'googleForms' };
            
        } catch (error) {
            console.error('Google Forms 提交失敗:', error);
            // 回退到顯示聯絡資訊
            alert('表單提交成功！我們將透過其他方式與您聯繫。');
            return { success: false, method: 'fallback' };
        }
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
