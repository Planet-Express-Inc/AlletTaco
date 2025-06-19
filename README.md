# AllesTaco – Online Marketplace Platform

**AllesTaco**  is a web application that provides a platform for facilitating sales. The structure is divided into three main areas:

---

## 📁 Project Structure

### 👤 Buyer View

| Directory           | Description |
|--------------------|-------------|
| `Kaeufer/`         | - Main view and dashboard for the buyer  <br> - Displays product selection or search results |
| `Warenkorb/`       | - Displays products in the shopping cart  <br> - Quantity can be adjusted  <br> - The "Buy" action only clears the cart |
| `orderHistory/`    | - Overview of purchased products <br> - Products can be rated |
| `Bewerten/`        | - Allows rating of purchased products and sellers <br> - Assignment to articles exists only in the database, not in the frontend |
| `verkaeuferProfil/`| - Shows the ratings of the logged-in user |

---

### 🧑‍💼 Seller View

| Directory              | Description |
|------------------------|-------------|
| `Verkaeufer/`          | - Seller's dashboard <br> - Displays all products listed by the seller |
| `newProduct/`          | - Form to add new products <br> - All fields are required |
| `editProduct/`         | - Edit existing products <br> - A new product image must be provided |
| `verkaeuferProfil/`    | - Shows ratings and reviews received by the seller |
| `verkaeuferVerkaufe/`  | - Overview of products the seller has already sold |
| `verkaeuferChart/`     | - Visual representation of sales in the form of a bar chart |

---

### ⚙️ Configuration & Shared Files

| File/Directory   | Description |
|------------------|-------------|
| `Bilder/`        | - Storage location for static images |
| `Start/`         | - Main landing page <br> - Handles registration, login, and account type selection <br> - Manages cookies |
| `all.js` / `all.css` | - Controls header and footer functionality <br> - Search, dropdown menus, imprint, privacy policy <br> - Contains global styling |
| `config.js`      | - Manages the base URL for API requests |

---

## 📄 License

MIT License – free to use and modify.  
Feel free to contribute or raise issues!

---