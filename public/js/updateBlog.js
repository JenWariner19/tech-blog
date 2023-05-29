const updateBlogFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#update-blogpost-title').value.trim()
    const content = document.querySelector('#update-blogpost-content').value.trim();
    const blogpostId = window.location.pathname.split("/")[3]; 

    console.log(blogpostId);

    if (title && content) {
      const response = await fetch(`/dashboard/updateBlog/${blogpostId}`, {
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