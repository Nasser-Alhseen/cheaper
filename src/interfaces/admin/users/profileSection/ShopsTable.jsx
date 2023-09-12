import ShopItemInTable from "./ShopItemInTable";

function ShopsTable(props) {
  try {
    return (
      <>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>اسم المحل</th>
                <th>نسبة الحسم</th>
                <th>تاريخ الاكتساب</th>
                <th>تاريخ الاستلام</th>
                <th>النوع</th>
                <th>المزيد</th>
              </tr>
            </thead>
            <tbody className="tbody">
              <ShopItemInTable />
            </tbody>
          </table>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ShopsTable;
