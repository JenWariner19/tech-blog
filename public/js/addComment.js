const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value.trim();
    const blogId = window.location.pathname.split("/")[2]; 
  
    if (content) {
      const response = await fetch(`/blog/${blogId}/addcomment`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/blog/${blogId}`);
      } else {
        alert('Failed to add comment.');
      }
    }
  };

  document
  .querySelector('#add-comment')
  .addEventListener('click', commentFormHandler);