function ShopItemInTable(props) {
  try {
    return (
      <>
        <tr>
          <td>
            <div className="table-wrapper-info">
              <img src="test.png" className="" />
              <p>تويكسي</p>
            </div>
          </td>
          <td>20%</td>
          <td>202303/27</td>
          <td>2023/05/29</td>
          <td>مجاني</td>
          <td>
            <a href="#">عرض المزيد</a>
          </td>
        </tr>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ShopItemInTable;
