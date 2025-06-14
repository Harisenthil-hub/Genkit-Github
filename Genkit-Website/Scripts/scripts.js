
// image slider
  
const slides = document.querySelectorAll('.slide');

if(slides){
  
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide); // Show first slide initially
  setInterval(nextSlide, 4000); // Change every 4 seconds

}
  



// running values for experience block


const counters = document.querySelectorAll('.count');

if(counters){
  
  let hasCounted = false;


  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;

      // Dynamic speed logic: slower for smaller values
      let duration = 1500; // total duration in ms
      if (target <= 10) duration = 7000;
      else if (target <= 100) duration = 2000;
      else if (target <= 500) duration = 1800;

      const increment = Math.max(1, Math.ceil(target / (duration / 20)));

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = count + '+';
          setTimeout(updateCount, 20); // 50 FPS
        } else {
          counter.innerText = target+'+';
        }
      };

      updateCount();
    });
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  window.addEventListener('scroll', () => {
    const section = document.querySelector('.section-3');
    if ( section && isInViewport(section) && !hasCounted) {
      hasCounted = true;
      animateCounters();
    }
  });

}
  


 



// icon animation through hover


  // document.querySelectorAll('.uni-item').forEach((item) => {
  //   const icon = item.querySelector('.uni-icon');
  //   const contentDiv = item.querySelector('.uni-content-div');

  //   contentDiv.addEventListener('mouseenter', () => {
  //     icon.play();  // starts animation
  //   });

  //   contentDiv.addEventListener('mouseleave', () => {
  //     icon.stop();  // stops animation
  //   });
  // });





// Animation


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      if (entry.target.classList.contains('typing-effect')) {
        entry.target.classList.add('animate');
      }
    }
  });
});

// Observe both slide-up and typing-effect elements
document.querySelectorAll('.slide-up, .typing-effect').forEach(el => observer.observe(el));






// Validation and working of forms full working and reset form button

    
document.addEventListener("submit", (e)=>{
  if(e.target.matches("form")){
    formLoader(e)
  }
});


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('reset-loader')) {
    document.querySelector('.over-flow-div').classList.remove('message')
    document.querySelector('.over-flow-div').classList.remove('loader-style')
    document.querySelector('.over-flow-div').innerHTML = `
    <div class="contact-details-div">
          <h5>Start a Coversation</h5>
          <form action="https://api.web3forms.com/submit" method="POST"> 
              <input type="hidden" name="access_key" value="28cb935b-e79f-4479-9e3a-9f87ba942747">
              <div class="name-div">
                  <div>
                      <span>First name *</span>
                      <input type="text" name="First name" required>
                  </div>
                  <div>
                      <span>Last name *</span>
                      <input type="text" name="Last name" required>
                  </div>
              </div>
              <div class="contact-same-layout">
                  <span>Email *</span>
                  <input type="text" name="Email" required>
              </div>
              <div class="contact-same-layout">
                  <span>Phone *</span>
                  <input type="text" name="Phone no" required>
              </div>
              <div class="contact-same-layout">
                  <span>How Can We Support You? *</span>
                  <select  name="Service" required>
                      <option value="" disabled selected>Select a Service</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Graphic Desiging">Graphic Desiging</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Other">Other</option>
                  </select>
              </div>
              <div class="text-area-div">
                  <span>Message *</span>
                  <textarea  id="textarea" placeholder="Let us know how we can Support you...." name="Text Description" required></textarea>
              </div>
              <div class="contact-btn-div">
                  <button class="submit-btn">Submit</button>
              </div>
          </form>
      </div>
    `;
  }
})
  


async function formLoader(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const outputDiv = document.querySelector(".contact-details-div");

  document.querySelector('.over-flow-div').classList.add('loader-style');
  outputDiv.innerHTML = `
    <div class="loader-con">
      <div style="--i: 0;" class="pfile"></div>
      <div style="--i: 1;" class="pfile"></div>
      <div class="pfile" style="--i: 2;"></div>
      <div class="pfile" style="--i: 3;"></div>
      <div class="pfile" style="--i: 4;"></div>
      <div class="pfile" style="--i: 5;"></div>
    </div>
    <div class='loader-text'><h3>Loading</h3></div>
  `;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    outputDiv.innerHTML = '';
    document.querySelector('.over-flow-div').classList.add('message');

    if (result.success) {
      document.querySelector(".contact-details-div").innerHTML = `
        <div class="success-message">
          <lord-icon src="https://cdn.lordicon.com/apmrcxtj.json" trigger="in" delay="500"
            state="in-reveal" colors="primary:#000000,secondary:#228B22"
            style="width:70px;height:70px"></lord-icon>
          <h3>Thank You!</h3>
          <p>Your message has been sent successfully. We will contact you shortly.</p>
          <button class="sam-btn reset-loader">Send another Message</button>
        </div>`;
    } else {
      document.querySelector(".contact-details-div").innerHTML = `
        <div class="error-message">
          <lord-icon src="https://cdn.lordicon.com/lltgvngb.json" trigger="in" stroke="bold"
            state="hover-oscillate" colors="primary:#000000,secondary:#911710"
            style="width:70px;height:70px"></lord-icon>
          <h3>Error</h3>
          <p>${result.message || "Something went wrong. Please try again later."}</p>
          <button class="try-again-btn">Try Again</button>
        </div>`;
    }
  } catch (error) {
    document.querySelector('.over-flow-div').classList.add('message');
    document.querySelector(".contact-details-div").innerHTML = `
      <div class="error-message">
        <lord-icon src="https://cdn.lordicon.com/lltgvngb.json" trigger="in" stroke="bold"
          state="hover-oscillate" colors="primary:#000000,secondary:#911710"
          style="width:70px;height:70px"></lord-icon>
        <h3>Submission Failed</h3>
        <p>There was an error connecting to the server. Please try again.</p>
        <button class="try-again-btn reset-loader">Try Again</button>
      </div>`;
  }
};


// Running icons


const scrollWraps = document.querySelectorAll(".scroll-wrap");

if(scrollWraps){
  
  // If reduced motion is not preferred, start animation
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
    }
    
    function addAnimation() {
    scrollWraps.forEach((wrap) => {
      // Find the scrolling container inside .scroll-wrap
      const scrollTrack = wrap.querySelector(".scroll-track");
    
      if (!scrollTrack) return;
    
      // Clone all .img-scroll elements
      const scrollItems = Array.from(scrollTrack.children);
      scrollItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        scrollTrack.appendChild(clone);
      });
    });
    }
}





/*

  const scrollTrack = document.querySelector('.scroll-track');
  const items = Array.from(scrollTrack.children);

  // Duplicate all icons
  items.forEach(item => {
    const clone = item.cloneNode(true);
    scrollTrack.appendChild(clone);
  });
*/

/*

const scrollWrap = document.querySelector(".scroll-wrap");

if(scrollWrap){


  const speed = 0.5; // px per frame

  // Duplicate children to simulate infinite scroll
  const originalChildren = [...scrollWrap.children];
  originalChildren.forEach(child => {
    scrollWrap.appendChild(child.cloneNode(true));
  });

  let position = 0;

  function animate() {
    position -= speed;

    // Reset when half of the scroll (original length) is passed
    const resetPoint = scrollWrap.scrollWidth / 2;
    if (Math.abs(position) >= resetPoint) {
      position = 0;
    }

    scrollWrap.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();

}
  */


// FAQ Section

const faqItems = document.querySelectorAll('.faq-item');

if(faqItems){

  function resetStack() {
    faqItems.forEach((item, i) => {
      item.classList.remove('active', 'blur');
      item.style.top = `${i * 55}px`;
      item.style.zIndex = `${faqItems.length - i}`;
    });
  }

  faqItems.forEach((item, i) => {
    item.style.top = `${i * 55}px`;
    item.style.zIndex = `${faqItems.length - i}`;

    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      resetStack();

      if (!isActive) {
        item.classList.add('active');
        item.style.top = `0px`;
        item.style.zIndex = 100;

        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.add('blur');
            
          }
        });
      }
    });
  });

}

  

