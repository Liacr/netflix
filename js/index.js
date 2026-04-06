document.addEventListener('DOMContentLoaded', () => {
        const profileLinks = document.querySelectorAll('.profile-link');
        
        profileLinks.forEach(link => {
          link.addEventListener('click', (e) => {
            const imgSrc = link.querySelector('img').src;
            const name = link.querySelector('span').textContent;
            
            // Armazenar no localStorage
            localStorage.setItem('activeProfile', JSON.stringify({
              name: name,
              img: imgSrc
            }));
          });
        });
      });