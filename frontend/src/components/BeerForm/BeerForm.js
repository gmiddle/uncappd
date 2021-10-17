import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBeer, fetchBeers } from "../../store/beers";
import './BeerForm.css'

function BeerForm({ beer }) {
    const sessionUser = useSelector(state => state.session.user)
    // const { setShowReviewModal } = useBeerSelected();
    const [beerName, setBeerName] = useState('');
    const [description, setDescription] = useState('');
    const [abv, setAbv] = useState('');
    const [ibu, setIbu] = useState('');
    const [beerImg, setBeerImg] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    if (sessionUser === undefined) {
        history.push('/');
        return null;
    }

    // const updateFile = (e) => {
    //     const file = e.target.files[0];
    //     if (file) setBeerImg(file);
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        const newBeer = {
            name: beerName,
            beerImg,
            description,
            abv,
            ibu
        };

        dispatch(createBeer(newBeer))
            .then(() => dispatch(fetchBeers()))
            .then(() => history.push('/beers'))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                    return
                }
            })
    }

    const goBack = () => {
        history.goBack()
    }

    return (
        <div className="new-beer-body">
            <div className="form-container">
                <p className="go-back" onClick={goBack}>Go Back</p>
                <form
                    onSubmit={onSubmit}
                    className="new-beer-form"
                >
                    <h1 className="new-beer-title">Add A New Beer!</h1>
                    {errors.length > 0 && <ul className="beer-errors">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>}
                    <label htmlFor="beerName">
                        <input
                            className="new-beer-input beer-name"
                            type="text"
                            id="beerName"
                            value={beerName}
                            placeholder="Beer Name"
                            onChange={(e) => setBeerName(e.target.value)} 
                        />
                    </label>
                    <label htmlFor="description">
                        <textarea 
                            className="new-beer-input beer-description"
                            type="text" 
                            id="description" 
                            value={description} 
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </label>
                    <label htmlFor="abv">
                        <input 
                            className="new-beer-input beer-abv"
                            type="number" 
                            id="abv" 
                            value={abv} 
                            placeholder="ABV"
                            onChange={(e) => setAbv(e.target.value)} 
                            step="0.1"
                            min="0"
                            max="9.9"
                        /> <span className="abv-label-text">%</span>
                    </label>
                    <label htmlFor="ibu">
                        <input 
                            className="new-beer-input beer-ibu"
                            type="number" 
                            id="ibu" 
                            value={ibu} 
                            placeholder="IBU"
                            onChange={(e) => setIbu(e.target.value)} 
                            step="0"
                            min="1"
                            max="300"
                        /> <span className="ibu-label-text">%</span>
                    </label>
                    <button className="new-beer-input new-beer-button">Create</button>
                </form>
            </div>

        </div>
    )
}

export default BeerForm;