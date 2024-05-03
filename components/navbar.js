function createNavbar() {
    const navbarHtml = `
        <nav class="navbar">
            <div class="nav-left">
                <a href="/homepage">CodeSphere</a>
                <a href="/">Profile</a>
                <a href="/">Articles</a>
                <a href="/">Forum</a>
            </div>
            <div class="nav-right">
                <a href="/">Login</a>
                <a href="/">Register</a>
            </div>
        </nav>
    `;

    // 选择一个元素来插入导航栏
    const headerElement = document.querySelector('body');
    headerElement.insertAdjacentHTML('beforebegin', navbarHtml);
}

// 当文档加载完成后，调用 createNavbar 函数
document.addEventListener('DOMContentLoaded', createNavbar);
