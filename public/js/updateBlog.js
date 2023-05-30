const updateBlogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#update-blogpost-title').value.trim()
    const content = document.querySelector('#update-blogpost-content').value.trim();
    const blogId = window.location.pathname.split("/")[3]; 

    if (title && content) {
      const response = await fetch(`/dashboard/updateBlog/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add blogpost.');
      }
    }
  };

const updateBtn = document.querySelector('#update-blogpost')
updateBtn.addEventListener('click', updateBlogFormHandler);
