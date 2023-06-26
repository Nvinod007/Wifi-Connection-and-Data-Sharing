export const postData = async (url:any, data:any) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Data posted successfully');
    } else {
      console.error('Failed to post data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};