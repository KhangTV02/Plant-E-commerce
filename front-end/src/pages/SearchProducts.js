import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import ShowAllProducts from '../components/ShowAllProducts'


const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("query", query.search)

    const fetchProduct = async () => {
        if (!query.search) {
            setData([]); // Nếu không có từ khóa tìm kiếm, không gọi API và xóa dữ liệu
            return;
        }

        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(() => {
        fetchProduct()
    }, [query.search]) // Thêm [query.search] vào mảng dependencies để fetch lại khi thay đổi từ khóa tìm kiếm

    return (
        <div className='container mx-auto p-4 mt-12'>
            {loading && (
                <p className='text-lg text-center'>Loading ...</p>
            )}

            {query.search && (
                <p className='text-lg font-semibold my-3'>
                    Kết quả tìm kiếm : {data.length}
                </p>
            )}

            {data.length === 0 && !loading && query.search && (
                <p className='bg-white text-lg text-center p-4'>Không tìm thấy dữ liệu....</p>
            )}

            {data.length !== 0 && !loading && (
                <ShowAllProducts loading={loading} data={data} />
            )}
        </div>
    )
}

export default SearchProduct