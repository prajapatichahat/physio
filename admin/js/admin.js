// Admin Dashboard Scripts

document.addEventListener('DOMContentLoaded', function () {
    // Sidebar Toggle Logic
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            content.classList.toggle('active');
        });
    }

    // Chart.js Initializations
    // Age Distribution Chart
    const ageChartCtx = document.getElementById('ageChart');
    if (ageChartCtx) {
        new Chart(ageChartCtx, {
            type: 'pie',
            data: {
                labels: ['0-18', '19-35', '36-50', '51+'],
                datasets: [{
                    data: [15, 35, 30, 20],
                    backgroundColor: ['#4338ca', '#0ea5e9', '#10b981', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Patient Comparison Chart
    const patientChartCtx = document.getElementById('patientChart');
    if (patientChartCtx) {
        new Chart(patientChartCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: '2025',
                        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90],
                        borderColor: '#94a3b8',
                        tension: 0.4
                    },
                    {
                        label: '2026',
                        data: [70, 75, 90, 95, 80, 85, 70, 75, 85, 95, 105, 120],
                        borderColor: '#4338ca',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Revenue Comparison Chart
    const revenueChartCtx = document.getElementById('revenueChart');
    if (revenueChartCtx) {
        new Chart(revenueChartCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: '2025 Revenue (from Patient Fees)',
                        data: [2000, 2500, 2200, 3000, 2800, 3200, 3500, 3100, 3400, 3800, 4000, 4500],
                        backgroundColor: '#cbd5e1'
                    },
                    {
                        label: '2026 Revenue (from Patient Fees)',
                        data: [2500, 2800, 3000, 3500, 3200, 3800, 4200, 4000, 4500, 4800, 5200, 5500],
                        backgroundColor: '#4338ca'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Calendar Interactivity
    const calendarDays = document.querySelectorAll('.calendar-day');
    if (calendarDays.length > 0) {
        calendarDays.forEach(day => {
            day.addEventListener('click', function () {
                calendarDays.forEach(d => d.classList.remove('active', 'shadow-sm'));
                this.classList.add('active', 'shadow-sm');
                // Mock schedule update can be added here
            });
        });
    }
});
