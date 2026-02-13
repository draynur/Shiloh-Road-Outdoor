/**
 * Shiloh Rd Outdoor — Main JS
 *
 * Smooth scroll, search/filter (AJAX), tag toggle, entry animations.
 */

(function () {
	'use strict';

	/* ---------------------------------------------------------------
	 * 1. Smooth scroll — [data-scroll-to="sectionId"]
	 * --------------------------------------------------------------- */
	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-scroll-to]');
		if (!btn) return;
		e.preventDefault();
		var id = btn.getAttribute('data-scroll-to');
		var el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});

	/* Back to top — [data-scroll-top] */
	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-scroll-top]');
		if (!btn) return;
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	/* ---------------------------------------------------------------
	 * 2. Search & tag filtering (AJAX)
	 * --------------------------------------------------------------- */
	var searchInput = document.getElementById('sro-search');
	var grid        = document.getElementById('sro-stories-grid');
	var countEl     = document.getElementById('sro-stories-count');
	var tagsWrap    = document.getElementById('sro-tags');
	var clearBtn    = document.getElementById('sro-clear-filters');
	var activeTag   = '';
	var debounceTimer;

	function fetchStories() {
		if (!grid || typeof sroAjax === 'undefined') return;

		var query = searchInput ? searchInput.value.trim() : '';
		var data  = new FormData();
		data.append('action', 'sro_filter_stories');
		data.append('nonce', sroAjax.nonce);
		data.append('search', query);
		data.append('tag', activeTag);

		fetch(sroAjax.url, { method: 'POST', body: data })
			.then(function (res) { return res.json(); })
			.then(function (json) {
				if (json.success) {
					grid.innerHTML = json.data.html;
					if (countEl) {
						var c = json.data.count;
						countEl.textContent = 'Showing ' + c + ' ' + (c === 1 ? 'story' : 'stories');
					}
				}
			})
			.catch(function () { /* silent */ });
	}

	function debouncedFetch() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(fetchStories, 300);
	}

	if (searchInput) {
		searchInput.addEventListener('input', debouncedFetch);
	}

	/* ---------------------------------------------------------------
	 * 3. Tag toggle
	 * --------------------------------------------------------------- */
	if (tagsWrap) {
		tagsWrap.addEventListener('click', function (e) {
			var tag = e.target.closest('.sro-tag');
			if (!tag) return;

			var slug = tag.getAttribute('data-tag');

			// Toggle: if already active, deactivate (set to "All").
			if (slug === activeTag) {
				slug = '';
			}
			activeTag = slug;

			// Update visual state on all tag buttons.
			var all = tagsWrap.querySelectorAll('.sro-tag');
			for (var i = 0; i < all.length; i++) {
				var t = all[i];
				var isActive = t.getAttribute('data-tag') === activeTag;
				if (isActive) {
					t.classList.add('active', 'bg-foreground', 'text-background');
					t.classList.remove('bg-background/70', 'text-foreground/80');
				} else {
					t.classList.remove('active', 'bg-foreground', 'text-background');
					t.classList.add('bg-background/70', 'text-foreground/80');
				}
			}

			fetchStories();
		});
	}

	/* ---------------------------------------------------------------
	 * 4. Clear button
	 * --------------------------------------------------------------- */
	if (clearBtn) {
		clearBtn.addEventListener('click', function (e) {
			e.preventDefault();
			if (searchInput) searchInput.value = '';
			activeTag = '';

			// Reset tag visuals.
			if (tagsWrap) {
				var all = tagsWrap.querySelectorAll('.sro-tag');
				for (var i = 0; i < all.length; i++) {
					var t = all[i];
					var isAll = t.getAttribute('data-tag') === '';
					if (isAll) {
						t.classList.add('active', 'bg-foreground', 'text-background');
						t.classList.remove('bg-background/70', 'text-foreground/80');
					} else {
						t.classList.remove('active', 'bg-foreground', 'text-background');
						t.classList.add('bg-background/70', 'text-foreground/80');
					}
				}
			}

			fetchStories();
		});
	}

	/* ---------------------------------------------------------------
	 * 5. "View stories" on author card — pre-fill search
	 * --------------------------------------------------------------- */
	document.addEventListener('click', function (e) {
		var btn = e.target.closest('[data-search-author]');
		if (!btn) return;
		e.preventDefault();
		var name = btn.getAttribute('data-search-author');
		if (searchInput) {
			searchInput.value = name;
			activeTag = '';

			// Reset tag visuals.
			if (tagsWrap) {
				var all = tagsWrap.querySelectorAll('.sro-tag');
				for (var i = 0; i < all.length; i++) {
					var t = all[i];
					var isAll = t.getAttribute('data-tag') === '';
					if (isAll) {
						t.classList.add('active', 'bg-foreground', 'text-background');
						t.classList.remove('bg-background/70', 'text-foreground/80');
					} else {
						t.classList.remove('active', 'bg-foreground', 'text-background');
						t.classList.add('bg-background/70', 'text-foreground/80');
					}
				}
			}

			fetchStories();

			var el = document.getElementById('stories');
			if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});

	/* ---------------------------------------------------------------
	 * 6. Entry animations — IntersectionObserver
	 * --------------------------------------------------------------- */
	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		);

		document.querySelectorAll('.sro-fade-up').forEach(function (el) {
			observer.observe(el);
		});
	} else {
		// Fallback: just show everything.
		document.querySelectorAll('.sro-fade-up').forEach(function (el) {
			el.classList.add('is-visible');
		});
	}
})();
