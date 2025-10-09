/**
 * FlyPig AI 表單後端整合
 * 支援多種數據收集方式：Google Forms、EmailJS、自定義 API
 */

class FormBackendIntegration {
    constructor() {
        this.config = {
            // Google Forms 整合（推薦）
            googleForms: {
                enabled: true,
                formId: '1FAIpQLSfy2Wk9bLc4H4IFNF2BAG2j-FajanxnE3U7TscZasCP7W5uDQ',
                // 欄位對應（需要與 Google Forms 欄位名稱匹配）
                fieldMapping: {
                    'entry.1234567890': 'companyName',     // 公司名稱
                    'entry.1234567891': 'contactPerson',   // 聯絡人
                    'entry.1234567892': 'email',           // 電子信箱
                    'entry.1234567893': 'phone',           // 聯絡電話
                    'entry.1234567894': 'services',        // 服務選擇
                    'entry.1234567895': 'budget',          // 預算範圍
                    'entry.1234567896': 'timeline',        // 時程
                    'entry.1234567897': 'requirements'     // 需求描述
                }
            },
            
            // EmailJS 整合（備選方案）
            emailJS: {
                enabled: false,
                serviceId: 'your_service_id',
                templateId: 'your_template_id',
                userId: 'your_user_id'
            },
            
            // 自定義 API（高級方案）
            customAPI: {
                enabled: false,
                endpoint: 'https://your-api.com/contact',
                apiKey: 'your_api_key'
            }
        };
    }

    /**
     * 提交表單數據到 Google Forms
     */
    async submitToGoogleForms(formData) {
        try {
            // 轉換數據格式以符合 Google Forms
            const googleFormsData = this.convertToGoogleFormsFormat(formData);
            
            // 構建 Google Forms 提交 URL（新格式）
            const submitUrl = `https://docs.google.com/forms/d/e/${this.config.googleForms.formId}/formResponse`;
            
            // 創建 FormData 對象
            const formDataToSubmit = new FormData();
            Object.entries(googleFormsData).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    formDataToSubmit.append(key, value);
                }
            });
            
            // 提交到 Google Forms
            const response = await fetch(submitUrl, {
                method: 'POST',
                mode: 'no-cors', // Google Forms 需要 no-cors
                body: formDataToSubmit
            });
            
            console.log('Google Forms 提交成功');
            return { success: true, method: 'googleForms' };
            
        } catch (error) {
            console.error('Google Forms 提交失敗:', error);
            throw error;
        }
    }

    /**
     * 轉換數據格式以符合 Google Forms
     */
    convertToGoogleFormsFormat(formData) {
        const googleData = {};
        
        // 基於常見的 Google Forms 欄位命名規則
        // 這些是估計的欄位名稱，實際可能需要調整
        const fieldMapping = {
            companyName: 'entry.1000000',      // 公司名稱
            contactPerson: 'entry.1000001',    // 聯絡人姓名
            email: 'entry.1000002',            // 電子信箱
            phone: 'entry.1000003',            // 聯絡電話
            services: 'entry.1000004',         // 感興趣的服務（複選框）
            budget: 'entry.1000005',           // 預算範圍
            timeline: 'entry.1000006',         // 期望完成時間
            requirements: 'entry.1000007'      // 詳細需求描述
        };
        
        // 基本資料對應
        Object.entries(fieldMapping).forEach(([dataKey, fieldName]) => {
            if (dataKey === 'services' && Array.isArray(formData[dataKey])) {
                // 處理複選框服務選擇
                formData[dataKey].forEach((service, index) => {
                    googleData[`${fieldName}_${index}`] = service;
                });
            } else if (formData[dataKey] !== undefined && formData[dataKey] !== '') {
                googleData[fieldName] = formData[dataKey];
            }
        });
        
        console.log('轉換後的 Google Forms 數據:', googleData);
        return googleData;
    }

    /**
     * 發送電子郵件通知
     */
    async sendEmailNotification(formData) {
        try {
            // 構建郵件內容
            const emailContent = this.buildEmailContent(formData);
            
            // 使用 EmailJS 發送郵件
            if (this.config.emailJS.enabled && window.emailjs) {
                await window.emailjs.send(
                    this.config.emailJS.serviceId,
                    this.config.emailJS.templateId,
                    emailContent,
                    this.config.emailJS.userId
                );
                console.log('郵件通知發送成功');
            }
            
            return { success: true, method: 'email' };
            
        } catch (error) {
            console.error('郵件通知發送失敗:', error);
            throw error;
        }
    }

    /**
     * 構建郵件內容
     */
    buildEmailContent(formData) {
        return {
            to_email: 'sales@icareu.tw',
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
    }

    /**
     * 提交到自定義 API
     */
    async submitToCustomAPI(formData) {
        try {
            const response = await fetch(this.config.customAPI.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.customAPI.apiKey}`
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                    source: 'FlyPig AI Website'
                })
            });
            
            if (!response.ok) {
                throw new Error(`API 回應錯誤: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('自定義 API 提交成功:', result);
            return { success: true, method: 'customAPI', data: result };
            
        } catch (error) {
            console.error('自定義 API 提交失敗:', error);
            throw error;
        }
    }

    /**
     * 主要提交方法
     */
    async submitForm(formData) {
        const results = [];
        
        try {
            // 1. 提交到 Google Forms（主要方式）
            if (this.config.googleForms.enabled) {
                try {
                    const result = await this.submitToGoogleForms(formData);
                    results.push(result);
                } catch (error) {
                    console.warn('Google Forms 提交失敗，嘗試其他方式');
                }
            }
            
            // 2. 發送郵件通知（備選）
            if (this.config.emailJS.enabled) {
                try {
                    const result = await this.sendEmailNotification(formData);
                    results.push(result);
                } catch (error) {
                    console.warn('郵件通知失敗');
                }
            }
            
            // 3. 提交到自定義 API（高級方案）
            if (this.config.customAPI.enabled) {
                try {
                    const result = await this.submitToCustomAPI(formData);
                    results.push(result);
                } catch (error) {
                    console.warn('自定義 API 提交失敗');
                }
            }
            
            // 檢查是否有成功的提交
            if (results.length === 0) {
                throw new Error('所有提交方式都失敗了');
            }
            
            return results;
            
        } catch (error) {
            console.error('表單提交完全失敗:', error);
            throw error;
        }
    }
}

// 導出類別
window.FormBackendIntegration = FormBackendIntegration;
