const updateBlogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#update-blogpost-title').value.trim()
    const content = document.querySelector('#update-blogpost-content').value.trim();
    const blogId = window.location.pathname.split("/")[3]; 

    console.log(blogId);

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

  document
  .querySelector('#update-blogpost')
  .addEventListener('click', updateBlogFormHandler);