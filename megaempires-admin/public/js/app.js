// Mega Empires Admin - Client-side JavaScript

$(document).ready(function() {
    // Initialize DataTables
    if ($('.data-table').length) {
        $('.data-table').DataTable({
            responsive: true,
            pageLength: 25,
            order: [[0, 'desc']], // Default sort by first column descending
            language: {
                search: "Search:",
                lengthMenu: "Show _MENU_ entries",
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                paginate: {
                    first: "First",
                    last: "Last",
                    next: "Next",
                    previous: "Previous"
                }
            }
        });
    }

    // Delete confirmation using SweetAlert2
    $('.delete-btn').on('click', function(e) {
        e.preventDefault();
        
        const form = $(this).closest('form');
        const itemName = $(this).data('item-name') || 'this item';
        const itemType = $(this).data('item-type') || 'item';
        
        Swal.fire({
            title: `Delete ${itemType}?`,
            text: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                form.submit();
            }
        });
    });

    // Form validation enhancement
    $('form').on('submit', function() {
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.html();
        
        // Show loading state
        submitBtn.prop('disabled', true).html(
            '<span class="spinner-border spinner-border-sm me-2"></span>Saving...'
        );
        
        // Reset button after 10 seconds (fallback)
        setTimeout(() => {
            submitBtn.prop('disabled', false).html(originalText);
        }, 10000);
    });

    // Auto-dismiss alerts after 5 seconds
    $('.alert').each(function() {
        const alert = $(this);
        if (alert.hasClass('alert-success')) {
            setTimeout(() => {
                alert.fadeOut();
            }, 5000);
        }
    });

    // Checkbox handling for boolean fields
    $('.boolean-checkbox').on('change', function() {
        const hiddenInput = $(this).siblings('input[type="hidden"]');
        hiddenInput.val(this.checked ? '1' : '0');
    });

    // Initialize boolean checkboxes based on hidden input values
    $('.boolean-checkbox').each(function() {
        const hiddenInput = $(this).siblings('input[type="hidden"]');
        if (hiddenInput.val() === '1') {
            $(this).prop('checked', true);
        }
    });

    // Number input validation
    $('input[type="number"]').on('input', function() {
        const value = parseInt($(this).val());
        const min = parseInt($(this).attr('min')) || 0;
        
        if (value < min) {
            $(this).val(min);
        }
    });

    // Date input default to today for new records
    $('input[type="date"]').each(function() {
        if (!$(this).val() && $(this).hasClass('default-today')) {
            const today = new Date().toISOString().split('T')[0];
            $(this).val(today);
        }
    });

    // Tooltip initialization
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Popover initialization
    $('[data-bs-toggle="popover"]').popover();

    // Search functionality for select dropdowns
    $('.searchable-select').select2({
        theme: 'bootstrap-5',
        placeholder: 'Select an option...',
        allowClear: true
    });

    // Form field focus enhancement
    $('.form-control, .form-select').on('focus', function() {
        $(this).closest('.form-group, .mb-3').addClass('focused');
    }).on('blur', function() {
        $(this).closest('.form-group, .mb-3').removeClass('focused');
    });

    // Navbar active link highlighting
    const currentPath = window.location.pathname;
    $('.navbar-nav .nav-link').each(function() {
        const linkPath = $(this).attr('href');
        if (currentPath.startsWith(linkPath) && linkPath !== '/') {
            $(this).addClass('active');
            $(this).closest('.dropdown').find('.dropdown-toggle').addClass('active');
        }
    });

    // Dashboard link highlighting
    if (currentPath === '/') {
        $('.navbar-nav .nav-link[href="/"]').addClass('active');
    }

    // Responsive table handling
    function handleResponsiveTables() {
        $('.table-responsive').each(function() {
            const table = $(this);
            if (table[0].scrollWidth > table[0].clientWidth) {
                table.addClass('has-scroll');
            } else {
                table.removeClass('has-scroll');
            }
        });
    }

    // Call on load and resize
    handleResponsiveTables();
    $(window).on('resize', handleResponsiveTables);

    // Print functionality
    $('.print-btn').on('click', function() {
        window.print();
    });

    // Export functionality placeholder
    $('.export-btn').on('click', function() {
        const format = $(this).data('format') || 'csv';
        const entity = $(this).data('entity') || 'data';
        
        Swal.fire({
            title: 'Export Data',
            text: `Export ${entity} as ${format.toUpperCase()}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Export',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // TODO: Implement actual export functionality
                Swal.fire('Success!', 'Export functionality will be implemented soon.', 'info');
            }
        });
    });
});

// Utility functions
window.MegaEmpiresAdmin = {
    // Show success message
    showSuccess: function(message) {
        Swal.fire({
            title: 'Success!',
            text: message,
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
        });
    },

    // Show error message
    showError: function(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    },

    // Confirm action
    confirm: function(title, text, callback) {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed && typeof callback === 'function') {
                callback();
            }
        });
    },

    // Format date for display
    formatDate: function(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    },

    // Format number with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};
