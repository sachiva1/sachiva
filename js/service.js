// Filter services based on selected category
function filterServices(category) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const isBusiness = card.classList.contains('business-service');
    const isHome = card.classList.contains('home-service');

    if (
      category === 'all' ||
      (category === 'business' && isBusiness) ||
      (category === 'home' && isHome)
    ) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Update active button styling
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`${category}-btn`).classList.add('active');
}
