/**
 * EmailJS 整合 - 更可靠的 Email 發送方式
 * 使用 EmailJS 服務直接發送 Email
 */

class EmailJSIntegration {
    constructor() {
        this.serviceId = 'service_flypig'; // 需要設定
        this.templateId = 'template_contact'; // 需要設定
        this.publicKey = 'your_public_key'; // 需要設定
        this.isInitialized = false;
    }

    async initialize() {
        try {
            // 載入 EmailJS
            if (typeof emailjs === 'undefined') {
                await this.loadEmailJS();
            }
            
            // 初始化 EmailJS
            emailjs.init(this.publicKey);
            this.isInitialized = true;
            
            console.log('✅ EmailJS 初始化成功');
            return true;
            
        } catch (error) {
            console.error('❌ EmailJS 初始化失敗:', error);
            return false;
        }
    }

    async loadEmailJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async sendEmail(formData) {
        if (!this.isInitialized) {
            const initialized = await this.initialize();
            if (!initialized) {
                throw new Error('EmailJS 初始化失敗');
            }
        }

        try {
            const templateParams = {
                to_email: 'flypig@icareu.tw',
                company_name: formData.companyName || '',
                contact_person: formData.contactPerson || '',
                email: formData.email || '',
                phone: formData.phone || '',
                services: Array.isArray(formData.services) ? formData.services.join(', ') : formData.services || '',
                budget: formData.budget || '',
                timeline: formData.timeline || '',
                requirements: formData.requirements || '',
                submit_time: new Date().toLocaleString('zh-TW'),
                source_url: window.location.href
            };

            console.log('📧 發送 Email 參數:', templateParams);

            const result = await emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams
            );

            console.log('✅ Email 發送成功:', result);
            return { success: true, result };

        } catch (error) {
            console.error('❌ Email 發送失敗:', error);
            throw error;
        }
    }
}

// 創建全域實例
window.emailJSIntegration = new EmailJSIntegration();

console.log('📧 EmailJS 整合已載入');
console.log('使用方法: window.emailJSIntegration.sendEmail(formData)');
