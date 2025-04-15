// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar color change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 處理自定義聯絡表單的提交
    const contactForm = document.getElementById('customContactForm');
    const hiddenIframe = document.getElementById('hidden_iframe');
    
    if (contactForm && hiddenIframe) {
        // 當 iframe 載入完成時觸發
        hiddenIframe.onload = function() {
            // 檢查是否為表單提交後的載入
            if (contactForm.classList.contains('submitted')) {
                // 清空表單
                contactForm.reset();
                contactForm.classList.remove('submitted');
                
                // 顯示成功訊息
                const formStatus = document.getElementById('formStatus');
                if (formStatus) {
                    formStatus.innerHTML = '感謝您的訊息！我們將盡快回覆您。';
                    formStatus.className = 'success mt-3 text-center p-3';
                    
                    // 5秒後清除表單狀態提示
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                        formStatus.className = 'mt-3 text-center';
                    }, 5000);
                }
                
                // 顯示 Toast 通知
                const toastEl = document.getElementById('formToast');
                const toastMessage = document.getElementById('toastMessage');
                if (toastEl && toastMessage) {
                    toastMessage.textContent = '感謝您的訊息！我們將盡快回覆您。';
                    const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
                    toast.show();
                }
            }
        };
        
        // 監聽表單提交事件
        contactForm.addEventListener('submit', function(e) {
            // 檢查是否選擇了至少一個服務選項
            const serviceCheckboxes = document.querySelectorAll('input[name="entry.1834065246"]:checked');
            if (serviceCheckboxes.length === 0) {
                e.preventDefault(); // 阻止表單提交
                
                // 顯示錯誤訊息
                const formStatus = document.getElementById('formStatus');
                if (formStatus) {
                    formStatus.innerHTML = '請至少選擇一項服務需求';
                    formStatus.className = 'error mt-3 text-center p-3';
                }
                
                // 滾動到錯誤訊息位置
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                return false;
            }
            
            // 標記表單已提交，用於 iframe onload 事件判斷
            contactForm.classList.add('submitted');
            
            // 顯示載入中訊息
            const formStatus = document.getElementById('formStatus');
            if (formStatus) {
                formStatus.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">載入中...</span></div> 請稍候...';
                formStatus.className = 'mt-3 text-center';
            }
        });
    }
});
