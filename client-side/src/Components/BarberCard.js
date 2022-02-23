import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setBarber } from "../store/actionCreators/actionCreator";
import { GetBarberData } from "../store/actionCreators/actionCreator";

function ChooseBarber() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { barberDatas, location } = useSelector((state) => state.data);
  const [filteredBarbers, setFiltered] = useState([]);
  const images = [
    "https://images.unsplash.com/photo-1588771930296-88c2cb03f386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1136&q=80",
    "https://media.istockphoto.com/photos/smiling-barber-cutting-customers-hair-in-salon-picture-id1030246848?k=20&m=1030246848&s=612x612&w=0&h=Olp8nnEpm_9MKM29DSkvCWT90u1_vUrnrTuyy716Mcg=",
    "https://media.istockphoto.com/photos/young-man-getting-haircut-by-male-hairdresser-at-barbershop-picture-id1278630773?k=20&m=1278630773&s=612x612&w=0&h=I5XgdvOOZgbKp_Y0iwirWpzhDKVzPhuEP3PW8v1vTc8=",
    "https://media.istockphoto.com/photos/barber-giving-a-haircut-in-his-shop-picture-id1308317288?k=20&m=1308317288&s=612x612&w=0&h=7LFjdkN3gQgmovEiPippix6SCTQsy5CK2DOfZ7l0dEo=",
    "https://media.istockphoto.com/photos/cooking-is-a-skill-every-bachelor-should-have-picture-id1181905499?k=20&m=1181905499&s=612x612&w=0&h=9TG0xdAG-hlcTjaQ7nDQKE5n-OxlRUNxxUlMEuKuqfQ=",
    "https://media.istockphoto.com/photos/client-during-beard-and-moustache-grooming-in-barber-shop-picture-id1298924675?k=20&m=1298924675&s=612x612&w=0&h=HlJyPj6PYuB2DiGvEMOFqryDVt5aFr3jO1WJQPNXBPg=",
    "https://media.istockphoto.com/photos/shaver-working-with-client-in-salon-picture-id836588510?k=20&m=836588510&s=612x612&w=0&h=Ic5xKodHhhaweuy9rbRusxf-WQAor9u20V6QgoD4vIU=",
    "https://media.istockphoto.com/photos/hairdresser-looking-at-client-and-trimming-his-haircut-picture-id1056459850?k=20&m=1056459850&s=612x612&w=0&h=Uww8hSV95inHbDwWMXTVfLacbtK0hliWa5u5OYXQsdU=",
    "https://media.istockphoto.com/photos/client-during-beard-and-moustache-grooming-in-barber-shop-picture-id1208370265?k=20&m=1208370265&s=612x612&w=0&h=4Qa7wqecwsf9yhtqa4A0UmYJQXMOMKKP7IqfRLyZikk=",
    "https://media.istockphoto.com/photos/barberclient-consultation-picture-id685933792?k=20&m=685933792&s=612x612&w=0&h=d0CEhlJ4J5IrATIZTIHQHqyAEOAVScOdOZtljpyW94k=",
    "https://media.istockphoto.com/photos/at-barber-shop-picture-id941961712?k=20&m=941961712&s=612x612&w=0&h=-Vz5bVQiJHpq6BrBW1lv1HNh-IJ1yQCvhK6-2WDKTI4=",
    "https://media.istockphoto.com/photos/my-coffee-makes-everyone-happy-picture-id1280680540?k=20&m=1280680540&s=612x612&w=0&h=JFe6zevXy_HPvWBIK5eHOuJNKVqW1eluOkQfTvbLYxQ=",
    "https://media.istockphoto.com/photos/man-at-barber-shop-getting-beard-care-treatment-picture-id1295065214?k=20&m=1295065214&s=612x612&w=0&h=M5QkYljRAVcrpUjkLp_vYR9Gw2gTWoV-Dgrkp5A18_U=",
  ];

  function toNavigate(value) {
    dispatch(setBarber(value));
    navigate("/book");
  }

  function showImage(images) {
    const lastElement = images.slice(-1);
    images.pop();
    return lastElement[0];
  }

  useEffect(() => {
    dispatch(GetBarberData());
  }, [dispatch]);

  useEffect(() => {
    if (barberDatas) {
      let filtered = [];

      filtered = barberDatas.filter((e) => {
        if (location === "1") {
          return e.city === "Jakarta";
        } else {
          return e.city === "Bandung";
        }
      });
      setFiltered(filtered);
    }
  }, [barberDatas]);

  return (
    <>
      <div className="flex justify-center  mb-16">
        <div className="flex flex-col w-11/12">
          {filteredBarbers.map((x) => (
            <div
              key={x.id}
              className="mb-4 bg-no-repeat bg-cover h-48 rounded"
              style={{
                backgroundImage: `url(${showImage(images)})`,
              }}
              onClick={() => toNavigate(x.id)}
            >
              <div className="flex justify-center mt-20">
                <p className="text-white text-2xl font-semibold">{x.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChooseBarber;
