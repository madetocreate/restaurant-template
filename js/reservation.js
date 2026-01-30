/**
 * Maison Doré - Reservation Form Handler
 */
(function() {
    'use strict';
    const form = document.getElementById('reservation-form');
    const successMessage = document.getElementById('reservation-success');
    const reservationNumber = document.getElementById('reservation-number');
    const dateInput = document.getElementById('date');

    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateInput.min = tomorrow.toISOString().split('T')[0];
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    function generateReservationNumber() {
        const prefix = 'MD';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return prefix + '-' + timestamp + '-' + random;
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            if (!data.date || !data.time || !data.guests || !data.firstname || !data.lastname || !data.email || !data.phone) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }

            const selectedDate = new Date(data.date);
            const dayOfWeek = selectedDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 1) {
                alert('Wir sind Sonntag und Montag geschlossen. Bitte wählen Sie einen anderen Tag.');
                return;
            }

            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.disabled = true;

            setTimeout(function() {
                const resNumber = generateReservationNumber();
                reservationNumber.textContent = resNumber;
                form.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }
})();
