const reviewsContainer = document.getElementById('reviews-container');
const reviewsEndpoint = 'http://localhost:3000/reviews';

async function loadReviews() {
    try {
        const response = await fetch(reviewsEndpoint);
        const reviews = await response.json();
        
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <h4>${review.name}</h4>
                <p>${review.message}</p>
                <small>${review.email}</small>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadReviews);
