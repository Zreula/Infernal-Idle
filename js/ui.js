// Wait for the DOM to be ready before running this script
document.addEventListener('DOMContentLoaded', function () {
    // Select all tab buttons and all tab sections
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabSections = document.querySelectorAll('.tab-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            this.classList.add('active');

            // Hide all sections
            tabSections.forEach(section => section.style.display = 'none');

            // Show the section corresponding to the clicked tab
            const targetSectionId = this.getAttribute('data-tab');
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.style.display = '';
            }
        });
    });
});