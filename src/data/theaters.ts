export interface TheaterSystem {
    id: string;
    name: string;
    logo: string;
}

export interface Theater {
    id: string;
    systemId: string;
    name: string;
    address: string;
    image: string;
    mapUrl: string;
}

export const THEATER_SYSTEMS: TheaterSystem[] = [
    {
        id: 'cgv',
        name: 'CGV Cinema',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/CGV_Logo.svg/1024px-CGV_Logo.svg.png'
    },
    {
        id: 'lotte',
        name: 'Lotte Cinema',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Lotte_Cinema_Logo.svg/2560px-Lotte_Cinema_Logo.svg.png'
    },
    {
        id: 'galaxy',
        name: 'Galaxy Cinema',
        logo: 'https://www.galaxycine.vn/website/images/galaxy-logo.png'
    },
    {
        id: 'bhd',
        name: 'BHD Star',
        logo: 'https://bhdstar.vn/wp-content/uploads/2023/07/logo-bhd-star.png'
    }
];

export const THEATERS: Theater[] = [
    {
        id: 'cgv-hung-vuong',
        systemId: 'cgv',
        name: 'CGV Hùng Vương Plaza',
        address: 'Tầng 7, Hùng Vương Plaza, 126 Hùng Vương, Q.5',
        image: 'https://www.cgv.vn/media/magentothem/banner/h/u/hung-vuong-plaza-3.jpg',
        mapUrl: 'https://maps.google.com/?q=CGV+Hùng+Vương+Plaza'
    },
    {
        id: 'cgv-vincom-dong-khoi',
        systemId: 'cgv',
        name: 'CGV Vincom Đồng Khởi',
        address: 'Tầng 3, TTTM Vincom Center Đồng Khởi, 72 Lê Thánh Tôn & 45A Lý Tự Trọng, Q.1',
        image: 'https://www.cgv.vn/media/magentothem/banner/v/i/vincom-dong-khoi.jpg',
        mapUrl: 'https://maps.google.com/?q=CGV+Vincom+Đồng+Khởi'
    },
    {
        id: 'lotte-cantavil',
        systemId: 'lotte',
        name: 'Lotte Cinema Cantavil',
        address: 'Tầng 7, Cantavil Premier, Xa Lộ Hà Nội, P. An Phú, Q.2',
        image: 'https://lottecinemavn.com/LCHS/Image/Cinema/600x400/HCM_Cantavil.jpg',
        mapUrl: 'https://maps.google.com/?q=Lotte+Cinema+Cantavil'
    },
    {
        id: 'galaxy-nguyen-du',
        systemId: 'galaxy',
        name: 'Galaxy Nguyễn Du',
        address: '116 Nguyễn Du, Q.1, TP. HCM',
        image: 'https://www.galaxycine.vn/website/images/nguyen-du.jpg',
        mapUrl: 'https://maps.google.com/?q=Galaxy+Nguyễn+Du'
    }
];
