import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect , useState} from 'react'
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import ListingItem from "../components/ListingItem"
import Spinner from '../components/Spinner';
export default function Offers() {

  const [offerListings , setOfferListings] = useState(null);
  const [loading , setLoading] = useState(true);
  //fetching all offer from data base
  useEffect(()=>{
    async function fetchOfferListing(){
      try{
        const listingRef = collection(db , "listings")
        const q = query(listingRef , where("offer"  , "==" , true) , orderBy("timestamp" , "desc"));
        const querySnap = await getDocs(q);
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
        setLoading(false);
        console.log(listings)
      }catch(error){
        console.log(error)
      }

    }
    fetchOfferListing();
  },[])

  if(loading){
    return <Spinner/>
  }
  return (
    <div>
      <div className='max-w-6xl mx-auto pt-4 space-y-6'>
      {offerListings && offerListings.length > 0 && (
          <div className='m-2 mb-6'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent Offer</h2>
            <Link to="/offers">
              <p className='px-3 text-sm text-blue-600 hover:text-blur-800 transition '>Show more offers</p>
            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {offerListings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
