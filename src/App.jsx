import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import CatalogPage from "./pages/CatalogPage/CatalogPage.jsx";
import CamperDetailsPage from "./pages/CamperDetailsPage/CamperDetailsPage.jsx";
import CamperFeatures from "./components/CamperFeatures/CamperFeatures.jsx";
import CamperReviews from "./components/CamperReviews/CamperReviews.jsx";

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/catalog/:camperId" element={<CamperDetailsPage />}>
                    <Route path="features" element={<CamperFeatures />} />
                    <Route path="reviews" element={<CamperReviews />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;