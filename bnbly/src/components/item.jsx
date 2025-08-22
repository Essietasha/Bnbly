      <div className="more">
        <p> {room.location} </p>
        <p> {room.description} </p>
        <p> {room.bedrooms} </p>
        <p> {room.beds} </p>
        <p> {room.baths} </p>
        <p> {room.city} </p>
        <p> {room.address} </p>
        <div> {room.amenities.map((amenity, index) => (
          <p key={index} className="mr-2 px-2 py-1 bg-gray-100 rounded">{amenity}</p>
        ))} </div>
        <p> {room.cleaningFee} </p>
        <p> {room.serviceFee} </p>
        <p> {room.checkIn} </p>
        <p> {room.checkOut} </p>
        <p> {room.maximumGuest} </p>
        <p> {room.cancellationPolicy} </p>
        <p> {room.safetyAndProperty} </p>
        <p> {room.quietHours} </p>
        <p> {room.smokingAllowed} </p>
        <p> {room.petsAllowed} </p>
        <p> {room.partiesAllowed} </p>
        <p> {room.moreImages.map((image, index) => (
          <img src={image} key={index} alt={`Additional Image ${index + 1}`} className="w-20 h-20 object-cover"/>
        ))} </p>
        <p> {room.hostId} </p>
        <p> {room.rating} </p>
        <p> {room.reviews} </p>
        <p> {room.guestFavorite ? "Guest favorite" : "Not guest favorite"} </p>
        <p> {room.topTen ? "Top 10" : "Not Top 10"} </p>
        <p> {room.reviewStats.cleanliness} </p>
        <p> {room.reviewStats.accuracy} </p>
        <p> {room.reviewStats.communication} </p>
        <p> {room.reviewStats.location} </p>
        <p> {room.reviewStats.checkIn} </p>
        <p> {room.reviewStats.value} </p>
        <p> {room.createdAt?.toDate().toLocaleString()} </p>
      </div>