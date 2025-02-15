### Course Introduction

### **Required API Tokens**

The course involves practical projects and exercises that will require the use of various API keys. These will be thoroughly guided in the individual lessons. However, the two main API tokens that you will use throughout the course are:

1. **The OpenAI API token**: This will be used to query LLMs like ChatGPT and GPT-4.
2. **The Deep Lake API token**: Essential for creating Deep Lake datasets as vector stores for the projects we’ll build during the course.

These are the steps you should take to get the OpenAI API token.

1. If you don't have an account yet, create one by going to **[https://platform.openai.com/**](https://platform.openai.com/**). If you already have an account, skip to step 5.
2. Fill out the registration form with your name, email address, and desired password.
3. OpenAI will send you a confirmation email with a link. Click on the link to confirm your account.
4. Please note that you'll need to verify your email account and provide a phone number for verification.
5. Log in to **[https://platform.openai.com/**](https://platform.openai.com/**).
6. Navigate to the API key section at **[https://platform.openai.com/account/api-keys**](https://platform.openai.com/account/api-keys**).
7. Click "Create new secret key" and give the key a recognizable name or ID.

You should take these steps to get the Deep Lake API token.

1. Sign up for an account on Activeloop's platform. You can sign up at [Activeloop's website](https://app.activeloop.ai/register). After specifying your username, click on the “Sign up” button. You should now see your homepage.
2. You should now see a “Create API token” button at the top of your homepage. Click on it, and you’ll get redirected to the “API tokens” page. This is where you can generate, manage, and revoke your API keys for accessing Deep Lake.
3. Click on the "Create API token" button. You should see a popup asking for a token name and an expiration date. By default, the token expiration date is set so that the token expires after one day from its creation, but you can set it further in the future if you want to keep using the same token for the whole duration of the course. Once you’ve set the token name and its expiration date, click the “Create API token” button.
4. You should now see a green banner saying that the token has been successfully generated, along with your new API token, on the “API tokens” page. To copy your token to your clipboard, click the square icon on its right.

Environment variables play an important role in storing sensitive information, such as API keys. Be careful not to share your API tokens with anyone!

### **Coding Environment**

Before embarking on this course, you need to ensure that you have the appropriate coding environment ready. This includes:

1. Having a code editor installed on your computer. A popular coding environment is Visual Studio Code.
2. Using Python virtual environments to manage Python libraries.
3. Alternatively, you could use Google Colab notebooks.

### **Google Colab**

Google Colaboratory, popularly known as Google Colab, is a _free cloud-based Jupyter notebook environment_. Data scientists and engineers widely use it to train machine learning and deep learning models using CPUs, GPUs, and TPUs. Google Colab comes with an array of features such as:

- Free access to GPUs and TPUs for accelerated model training.
- A web-based interface for a service running on a virtual machine, eliminating the need for local software installation.
- Seamless integration with Google Drive and GitHub.

To use Google Colab, all you need is a Google account. You can run terminal commands directly in notebook cells by appending an exclamation mark (!) before the command. Every notebook created in Google Colab gets stored in your Google Drive for easy access.

A convenient way of using API keys in Colab involves:

1. Saving them in a file named `.env` on your Google Drive. Here’s how the file should be formatted for saving the Activeloop token and the OpenAI API key.

```python
ACTIVELOOP_TOKEN=your_activeloop_token
OPENAI_API_KEY=your_openai_key
```

1. Mounting your Google Drive on your Colab instance.
2. Loading them as environment variables using the **`dotenv`** library, like in the following code.

```python
from dotenv import load_dotenv 
load_dotenv('/content/drive/MyDrive/path/to/.env')
```

### **Creating Python Virtual Environments**

Python virtual environments offer an excellent solution for managing Python libraries and avoiding package conflicts. They create isolated environments for installing packages, ensuring that your packages and their dependencies are contained within that environment. This setup provides clean and isolated environments for your Python projects.

To create a virtual environment, follow these steps:

1. Create a virtual environment using the command **`python -m venv my_venv_name`**.
2. Activate the virtual environment by executing **`source my_venv_name/bin/activate`**.
3. Install the required libraries and run the code snippets from the lessons within the virtual environment.
4. To deactivate the virtual environment, simply run **`deactivate`**.

### **Building Efficient Retrievers with Deep Lake**

Efficient retrievers are built using embedding models that map texts to vectors. These vectors are then stored in specialized databases called **vector stores**.

This is where **Deep Lake** comes in. As a data lake that doubles as a vector store for multiple data types, Deep Lake provides several advantages:

1. **Multimodal**: Deep Lake can store items of diverse modalities - text, images, audio, and video - along with their vector representations.
2. **Serverless**: The serverless nature of Deep Lake allows for the creation and management of cloud datasets without the need for a dedicated database instance. This streamlines the setup process and accelerates project development.
3. **Data Loader**: Deep Lake makes creating a streaming data loader from the loaded dataset easy, which is particularly useful for fine-tuning machine learning models using frameworks like PyTorch and TensorFlow.
4. **Querying and Visualization**: Data can be queried and visualized easily from the web.

In the context of LLM applications, Deep Lake provides a seamless way to store embeddings and their corresponding metadata. It enables hybrid searches on these embeddings and their attributes for efficient data retrieval. Moreover, as LangChain integrates with it, it facilitates the development and deployment of LLM-based applications.

As a result, Deep Lake serves as a convenient serverless memory solution for LLM chains and agents, whether for storing relevant documents for question-answering tasks or storing images for guided image-generation tasks.

In summary, **Deep Lake** equips developers with a powerful tool to tackle the challenges of creating LLM-based applications and enhance the capabilities of these transformative models.

![[Pasted image 20230620234323.png]]

_Intel, the Intel logo, and other Intel marks are trademarks of Intel Corporation or its subsidiaries._