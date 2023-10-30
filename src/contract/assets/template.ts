export default {
  name: 'template',
  template: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    html {
      background-color: rgb(156, 156, 156);
    }
    body {
      size : A4;
      padding: 2cm;
      background-color: white;
    }
    h1 {
      text-align: center;
    }
    h3 {
      text-align: center;
    }
    table {
      margin-top: 0.25cm;
    }
    table tr td {
      padding: 5px;
    }
    .signature {
      display: flex;
      justify-content: space-between;
      margin-top: 2.5cm;
    }
  </style>
</head>
<body>
  <div>
    <h1>Surat Perjanjian Kerja Lepas</h1>
    <p>Yang bertanda tangan di bawah ini:</p>
    <table>
      <tr>
        <td>Nama</td>
        <td>:</td>
      </tr>
      <tr>
        <td>Alamat</td>
        <td>:</td>
      </tr>
      <tr>
        <td>No. Telepon</td>
        <td>:</td>
      </tr>
    </table>
    <p>Selanjutnya disebut sebagai <b>PEKERJA</b></p>
    <p>Dengan ini menyatakan bahwa PEKERJA telah sepakat untuk bekerja pada <b>PERUSAHAAN</b> dengan ketentuan sebagai berikut:</p>
    <table>
      <tr>
        <td>Nama</td>
        <td>:</td>
      </tr>
      <tr>
        <td>Alamat</td>
        <td>:</td>
      </tr>
      <tr>
        <td>No. Telepon</td>
        <td>:</td>
      </tr>
    </table>
    <p>Selanjutnya disebut sebagai <b>PERUSAHAAN</b></p>
    <br>
    <table>
      <tr>
        <td>Waktu Kerja</td>
        <td>:</td>
      </tr>
      <tr>
        <td>Upah</td>
        <td>:</td>
      </tr>
      <tr>
        <td>Periode Pembayaran</td>
        <td>:</td>
      </tr>
      <tr>
        <td>Periode Kontrak</td>
        <td>:</td>
      </tr>
    </table>
    <div class="signature">
    </div>
  </div>
</body>
</html>`,
};
