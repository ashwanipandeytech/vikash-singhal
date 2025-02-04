$(document).ready(function () {

  const redirectTo = localStorage.getItem('redirectTo');

  if (redirectTo) {
      // If the item exists, perform an action
      console.log('Visited from services link!');
      var targetSection = $("#" + redirectTo);
      var navHeight = $("nav").outerHeight();

      $("html, body").animate(
        {
          scrollTop: targetSection.offset().top - navHeight,
        },
        500
        
      );
      // Remove the localStorage item after 2 seconds
      setTimeout(function() {
        localStorage.removeItem('redirectTo');
       // console.log('LocalStorage item removed after 2 seconds');
    }, 500);  // 2000 milliseconds = 2 second
  } else {
      console.log('No visit data found.');
  }
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Trigger animation on each scroll
    });

    // jQuery Smooth Scroll (without hash in URL)
    $(".scroll-link").on("click", function (event) {
      console.info("console");

      event.preventDefault();

      var targetSection = $("#" + $(this).data("target"));
      var navHeight = $("nav").outerHeight();

      $("html, body").animate(
        {
          scrollTop: targetSection.offset().top - navHeight,
        },
        500
      );
    });



    $(".brand-carousel").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    // $(".testimonial-slider").slick({
    //   slidesToShow: 2,
    //   slidesToScroll: 2,
    //   autoplay: true,
   
    //   autoplaySpeed: 2000,
    //   responsive: [
    //     {
    //       breakpoint: 1024,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 2,
    //         infinite: true,
    //         dots: true,
    //       },
    //     },
    //     {
    //       breakpoint: 600,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //       },
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //       },
    //     },
    //   ],
    // });


  });

  window.onload = function() {
    // Check if the localStorage item exists
    const redirectTo = localStorage.getItem('redirectTo');

    if (redirectTo) {
        // If the item exists, perform an action
        console.log('Visited from services link!');
        // Optionally, you can clear the localStorage after checking
        // localStorage.removeItem('redirectTo');
    } else {
        console.log('No visit data found.');
    }
};

  document.getElementById('contactVForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    document.getElementById('loader').style.display = 'flex';
    // Get form data
    const formData = new FormData(this);

    // Convert form data to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.info('jsonData', jsonData); // Debugging: Check the JSON data

    // Send the data to the server using fetch
    fetch('/formsubmission.php', { // Use the correct path to your PHP file
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(jsonData), // Send the JSON data
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
       // Hide the loader
       document.getElementById('loader').style.display = 'none';

       // Show toaster notification
       const toaster = document.getElementById('toaster');
       const toasterMessage = document.getElementById('toaster-message');

       toasterMessage.textContent = data.message;

       if (data.status === 'success') {
           toaster.className = 'success';
       } else {
           toaster.className = 'error';
       }

       toaster.style.display = 'block';

       // Hide the toaster after 3 seconds
       setTimeout(() => {
           toaster.style.display = 'none';
           document.getElementById('responseMessage').textContent = '';
       }, 3000);
       resetEmail()

    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred. Please try again.';
        setTimeout(() => {
          toaster.style.display = 'none';
          document.getElementById('responseMessage').textContent = '';
      }, 3000);
   
      });
});
document.getElementById('contactVForm2').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  document.getElementById('loader').style.display = 'flex';
  // Get form data
  const formData = new FormData(this);

  // Convert form data to JSON
  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });

  

  // Send the data to the server using fetch
  fetch('/formsubmission.php', { // Use the correct path to your PHP file
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(jsonData), // Send the JSON data
  })
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
      // Display the response message
      document.getElementById('responseMessage2').textContent = data.message;
      // Hide the loader
      document.getElementById('loader').style.display = 'none';

      // Show toaster notification
      const toaster = document.getElementById('toaster');
      const toasterMessage = document.getElementById('toaster-message');

      toasterMessage.textContent = data.message;

      if (data.status === 'success') {
          toaster.className = 'success';
      } else {
          toaster.className = 'error';
      }

      toaster.style.display = 'block';

      // Hide the toaster after 3 seconds
      setTimeout(() => {
          toaster.style.display = 'none';
          document.getElementById('responseMessage2').textContent = '';
      }, 3000);
      resetEmail()
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('responseMessage2').textContent = 'An error occurred. Please try again.';
      setTimeout(() => {
        toaster.style.display = 'none';
        document.getElementById('responseMessage2').textContent = '';
    }, 3000);
    });
});

function resetEmail() {
  document.getElementById('inputName').value = '';
  document.getElementById('inputEmail').value = '';
  document.getElementById('inputTextarea').value = '';
  document.getElementById('inputEmail1').value = '';
 
}

function goToHome() {
  // Set the local storage item
  

  // Redirect to the homepage
  window.location.href = '/'; // This assumes the home page is at the root URL ("/")
}

