class Pagination {
  constructor(totalItems, itemsPerPage, currentPage = 1) {
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.currentPage = currentPage;
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
  }

  offset() {
    return this.itemsPerPage * (this.currentPage - 1);
  }

  get startIndex() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.itemsPerPage, this.totalItems);
  }

  hasNext() {
    return this.currentPage < this.totalPages;
  }

  hasPrevious() {
    return this.currentPage > 1;
  }

  prevPage() {
    const prevPage = this.currentPage - 1;
    if (prevPage >= 1) {
      return prevPage;
    } else {
      return false;
    }
  }

  nextPage() {
    const nextPage = this.currentPage + 1;
    if (nextPage <= this.totalPages) {
      return nextPage;
    } else {
      return false;
    }
  }

  prevLink() {
    let html = "";
    if (this.prevPage()) {
      html += `<li><a href="?page=${this.prevPage()}" class="text-xl font-semibold text-gray-700 p-2 px-3">«</a></li>`;
    }
    return html;
  }

  nextLink() {
    let html = "";
    if (this.nextPage()) {
      html += `<li><a href="?page=${this.nextPage()}" class="text-xl font-semibold text-gray-700 p-2 px-3">»</a></li>`;
    }
    return html;
  }

  pageNumbers() {
    let html = "";
    for (let i = 1; i <= this.totalPages; i++) {
      if (i === this.currentPage) {
        html += `<li><span class="font-semibold p-2 px-3 bg-emerald-700 text-white">${i}</span></li>`;
      } else {
        html += `<li><a href="?page=${i}" class="font-semibold text-gray-700 p-2 px-3">${i}</a></li>`;
      }
    }
    return html;
  }

  pagination() {
    let html = "";
    if (this.totalItems > 0) {
      html += `<ul class="mt-6 flex items-center flex-wrap">`;
      html += this.prevLink();
      html += this.pageNumbers();
      html += this.nextLink();
      html += `</ul>`;
    }
    return html;
  }
}

module.exports = Pagination;
