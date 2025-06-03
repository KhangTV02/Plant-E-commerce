const displayCurrency = (num) => {
    const formatter = new Intl.NumberFormat('vi-VN',{
        style : "currency",
        currency : 'VND',
        // minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default displayCurrency