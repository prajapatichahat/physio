// ===== NEUROFIT - INNER PAGES SCRIPTS =====

// ===== FAQ ACCORDION =====
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('active'));
  // Toggle current
  if (!isOpen) {
    answer.classList.add('open');
    el.classList.add('active');
  }
}

// ===== APPOINTMENT WIZARD =====
let selectedMeetingType = 'In-Person Visit';
let selectedTimeSlot = '';

function selectMeetingType(el) {
  document.querySelectorAll('.meeting-type').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  selectedMeetingType = el.querySelector('h4').textContent;
}

function selectTimeSlot(el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  selectedTimeSlot = el.textContent;
}

function wizardNext(step) {
  // Hide all panels
  document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.wizard-step').forEach(s => {
    s.classList.remove('active');
    s.classList.remove('done');
  });

  // Show target panel
  const target = document.getElementById('wizStep' + step);
  if (target) target.classList.add('active');

  // Update step indicators
  document.querySelectorAll('.wizard-step').forEach(s => {
    const sNum = parseInt(s.dataset.step);
    if (sNum < step) s.classList.add('done');
    if (sNum === step) s.classList.add('active');
  });

  // If step 3, build summary
  if (step === 3) {
    buildWizardSummary();
  }

  // Scroll to wizard
  const wizForm = document.querySelector('.wizard-form');
  if (wizForm) wizForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildWizardSummary() {
  const summary = document.getElementById('wizSummary');
  if (!summary) return;

  const service = document.getElementById('wizService')?.value || 'Not selected';
  const date = document.getElementById('wizDate')?.value || 'Not selected';
  const name = document.getElementById('wizName')?.value || '';
  const phone = document.getElementById('wizPhone')?.value || '';
  const email = document.getElementById('wizEmail')?.value || '';
  const age = document.getElementById('wizAge')?.value || '';
  const gender = document.getElementById('wizGender')?.value || '';
  const condition = document.getElementById('wizCondition')?.value || '';

  summary.innerHTML = `
    <div style="display:grid;gap:8px;font-size:.92rem">
      <div><strong>Meeting Type:</strong> ${selectedMeetingType}</div>
      <div><strong>Service:</strong> ${service}</div>
      <div><strong>Date:</strong> ${date}</div>
      <div><strong>Time:</strong> ${selectedTimeSlot || 'Not selected'}</div>
      <hr style="border-color:var(--gray-100)">
      <div><strong>Name:</strong> ${name}</div>
      <div><strong>Phone:</strong> ${phone}</div>
      <div><strong>Email:</strong> ${email || 'N/A'}</div>
      <div><strong>Age / Gender:</strong> ${age} / ${gender}</div>
      <div><strong>Condition:</strong> ${condition || 'N/A'}</div>
    </div>
  `;
}

function submitWizard() {
  const service = document.getElementById('wizService')?.value || '';
  const date = document.getElementById('wizDate')?.value || '';
  const name = document.getElementById('wizName')?.value || '';
  const phone = document.getElementById('wizPhone')?.value || '';
  const age = document.getElementById('wizAge')?.value || '';
  const gender = document.getElementById('wizGender')?.value || '';
  const condition = document.getElementById('wizCondition')?.value || '';

  const text = `Hello Neurofit Physio!%0A%0A*New Online Appointment Booking*%0A%0A📋 *Appointment Details*%0AType: ${selectedMeetingType}%0AService: ${service}%0ADate: ${date}%0ATime: ${selectedTimeSlot}%0A%0A👤 *Patient Details*%0AName: ${name}%0APhone: ${phone}%0AAge: ${age}%0AGender: ${gender}%0ACondition: ${condition || 'N/A'}`;

  window.open(`https://wa.me/919876543210?text=${text}`, '_blank');

  // Show success state
  const panel = document.getElementById('wizStep3');
  if (panel) {
    panel.innerHTML = `
      <div class="confirmation-card">
        <i class="fas fa-check-circle" style="color:var(--secondary)"></i>
        <h3>Appointment Request Sent! ✅</h3>
        <p style="color:var(--gray-500)">Your appointment request has been sent via WhatsApp. Our team will confirm your appointment within 24 hours.</p>
        <div style="margin-top:20px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="index.html" class="btn btn-outline">Back to Home</a>
          <a href="tel:+919876543210" class="btn btn-primary"><i class="fas fa-phone"></i> Call for Instant Confirm</a>
        </div>
      </div>
    `;
  }
}

// ===== GUIDANCE FORM =====
document.addEventListener('DOMContentLoaded', () => {
  const guidanceForm = document.getElementById('guidanceForm');
  if (guidanceForm) {
    guidanceForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(guidanceForm);
      const inputs = guidanceForm.querySelectorAll('input, select, textarea');
      let name = '', phone = '', concern = '', time = '', desc = '';
      inputs.forEach((inp, i) => {
        if (i === 0) name = inp.value;
        if (i === 1) phone = inp.value;
        if (i === 3) concern = inp.value;
        if (i === 4) time = inp.value;
        if (i === 5) desc = inp.value;
      });
      const text = `Hello Neurofit Physio!%0A%0A*Online Guidance Request*%0AName: ${name}%0APhone: ${phone}%0AConcern: ${concern}%0APreferred Time: ${time}%0ADescription: ${desc || 'N/A'}`;
      window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
      const btn = guidanceForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Request Sent!';
      btn.style.background = '#25D366';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; guidanceForm.reset(); }, 3000);
    });
  }

  // Quick Book form on service detail
  const quickBookForm = document.getElementById('quickBookForm');
  if (quickBookForm) {
    quickBookForm.addEventListener('submit', e => {
      e.preventDefault();
      const inputs = quickBookForm.querySelectorAll('input');
      const serviceName = document.getElementById('sdTitle')?.textContent || 'Physiotherapy';
      let name = inputs[0]?.value || '';
      let phone = inputs[1]?.value || '';
      let date = inputs[2]?.value || '';
      const text = `Hello Neurofit Physio!%0A%0A*Quick Booking Request*%0AService: ${serviceName}%0AName: ${name}%0APhone: ${phone}%0ADate: ${date}`;
      window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
      const btn = quickBookForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      btn.style.background = '#25D366';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; quickBookForm.reset(); }, 3000);
    });
  }
});
