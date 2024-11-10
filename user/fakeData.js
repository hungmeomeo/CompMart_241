let productId = 0
const incId = () => {
    productId += 1
    return productId
}

const BookData = [
    {
        productId: 1,
        productName: "Konosuba",
        productPrice: "10.24",
        isInStock: true,
        imgUrl: 'https://m.media-amazon.com/images/M/MV5BYmZhMTJhZDgtZTc0Yi00NjcxLThhYTAtNmJiYTljMzc1Y2NiXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_.jpg'
    },
    {
        productId: 2,
        productName: "Mushoku Tensei",
        productPrice: "13.45",
        isInStock: true,
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Mushoku_Tensei_1.png'
    },
    {
        productId: 3,
        productName: "Tensei Shitara Slime",
        productPrice: "11.35",
        isInStock: true,
        imgUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1606384774i/53831130.jpg'
    },
    {
        productId: 4,
        productName: "Overlord",
        productPrice: "11.65",
        isInStock: true,
        imgUrl: 'https://cdn0.fahasa.com/media/catalog/product/o/v/overlord-1---bia1.jpg'
    },
    {
        productId: 5,
        productName: "Spice & Wolf",
        productPrice: "10.19",
        isInStock: true,
        imgUrl: 'https://productimages.worldofbooks.com/031633961X.jpg'
    },
    {
        productId: 6,
        productName: "Classroom of the Elite",
        productPrice: "12.67",
        isInStock: true,
        imgUrl: 'https://i.docln.net/lightnovel/covers/s1028-11db69ed-ae86-4c21-a2ac-cfdda42f5ecc-m.jpg'
    },
    {
        productId: 7,
        productName: "Date A Live",
        productPrice: "15.19",
        isInStock: true,
        imgUrl: 'https://cdn-amz.woka.io/images/I/818p8gTcpqL.jpg'
    },
    {
        productId: 8,
        productName: "Otonari no Tenshi",
        productPrice: "13.45",
        isInStock: true,
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/The_Angel_Next_Door_Spoils_Me_Rotten_volume_1_cover.jpg/220px-The_Angel_Next_Door_Spoils_Me_Rotten_volume_1_cover.jpg'
    },
    {
        productId: 9,
        productName: "Roshidere",
        productPrice: "10.12",
        isInStock: true,
        imgUrl: 'https://img.lazcdn.com/g/p/5091528504b6dc0ffb86f1da26ebd3dc.jpg_720x720q80.jpg'
    },
    {
        productId: 10,
        productName: "Otomege Sekai wa Mob ni Kibishii Sekai desu",
        productPrice: "13.55",
        isInStock: true,
        imgUrl: 'https://i.docln.net/lightnovel/covers/s6726-cc4b362a-fb2d-4dba-9472-e8bcfc2a83cb-m.jpg'
    },
    {
        productId: 11,
        productName: "Kusuriya no Hitorigoto",
        productPrice: "9.15",
        isInStock: true,
        imgUrl: 'https://i.redd.it/5tlaqekyue061.jpg'
    },
    {
        productId: 12,
        productName: "Seishun Buta Yarou",
        productPrice: "17.10",
        isInStock: true,
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Seishun_Buta_Yar%C5%8D_light_novel_volume_1_cover.jpg/220px-Seishun_Buta_Yar%C5%8D_light_novel_volume_1_cover.jpg'
    },
    {
        productId: 13,
        productName: "Jaku-chara Tomozaki-kun",
        productPrice: "17.12",
        isInStock: true,
        imgUrl: 'https://i.redd.it/1dika1jm9tb21.jpg'
    },
    {
        productId: 14,
        productName: "Blue Lock",
        productPrice: "7.45",
        isInStock: true,
        imgUrl: 'https://upload.wikimedia.org/wikipedia/vi/0/07/Blue_Lock_vol_1.jpg'
    },
    {
        productId: 15,
        productName: "Aoashi",
        productPrice: "8.69",
        isInStock: true,
        imgUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ed/Aoashi_vol_1.png'
    },
    {
        productId: 16,
        productName: "Re:zero",
        productPrice: "15.46",
        isInStock: true,
        imgUrl: 'https://m.media-amazon.com/images/I/81cNfgJEI-L._AC_UF1000,1000_QL80_.jpg'
    },
    {
        productId: 17,
        productName: "Gosick",
        productPrice: "10.19",
        isInStock: true,
        imgUrl: 'https://upload.wikimedia.org/wikipedia/vi/b/b0/Gosick_vol_1.jpg'
    },
    {
        productId: 18,
        productName: "Waga Gyouyuu Ni Furueyo Tenchi",
        productPrice: "12.12",
        isInStock: true,
        imgUrl: 'https://jpbookstore.com/cdn/shop/products/71hO30ZtFFL.jpg?v=1637039980'
    },
    {
        productId: 19,
        productName: "Dungeon ni Deai wo Motomeru",
        productPrice: "15.46",
        isInStock: true,
        imgUrl: 'https://www.baka-tsuki.org/project/images/f/fb/DanMachi_Vol_1_Cover.jpeg'
    },
    {
        productId: 20,
        productName: "Grimgar of Fantasy & Ash",
        productPrice: "17.42",
        isInStock: true,
        imgUrl: 'https://images-na.ssl-images-amazon.com/images/I/81ClHUnljrL.jpg'
    },


]

export default BookData