<template>
  <Navbar></Navbar>
  <div class="sic container mt-4">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-8">
          <div id="v-model-select" class="demo">
            <div class="row mb-4">
              <div class="col-6">
                <select v-model="negara" class="form-select">
                  <option :value="360">Indonesia</option>
                  <option :value="458">Malaysia</option>
                  <option :value="156">China</option>
                  <option :value="392">Jepang</option>
                  <option :value="764">Thailand</option>
                  <option :value="704">Viet Nam</option>
                  <option :value="699">India</option>
                </select>
              </div>
              <div class="col-6">
                <select v-model="pebanding" class="form-select">
                  <option :value="360">Indonesia</option>
                  <option :value="458">Malaysia</option>
                  <option :value="156">China</option>
                  <option :value="392">Jepang</option>
                  <option :value="764">Thailand</option>
                  <option :value="704">Viet Nam</option>
                  <option :value="699">India</option>
                </select>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-6">
                <div id="v-model-radiobutton">
                  <!-- radio 1 -->
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="beras" value="1006" v-model="komoditas" />
                    <label for="beras" class="form-check-label">Beras</label>
                  </div>
                  <!-- radio 2 -->
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="kelapaSawit" value="120710" v-model="komoditas" />
                    <label for="kelapaSawit" class="form-check-label">Kelapa Sawit</label>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div id="v-model-radiobutton">
                  <!-- radio 1 -->
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="karet" value="4001" v-model="komoditas" />
                    <label for="karet" class="form-check-label">Karet</label>
                  </div>
                  <!-- radio 2 -->
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="kelapa" value="151311" v-model="komoditas" />
                    <label for="kelapa" class="form-check-label">Kelapa</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <input type="text" placeholder="Tahun - Jika lebih dari 1 berikan tanda , (koma)" v-model="tahun" class="form-control">
              </div>
            </div>
          </div>
        <div>
          <div v-if="this.loading == true" disable class="btn w-100 mb-4 btn-warning">
            Loading ...
          </div>
          <div v-else @click="getdata()" class="btn w-100 mb-4 btn-primary">
            Get Data
          </div>
        </div>
        <table class="table table-bordered">
          <thead class="thead">
            <tr>
              <th>Negara Asal</th>
              <th>Tipe Transaksi</th>
              <th>Negara Tujuan</th>
              <th>Jumlah (KG)</th>
              <th>Biaya</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody class="tbody" v-if="sic.length > 0">
            <tr v-for="data in sic" v-bind:key="data.yr">
              <td>{{ data.rtTitle }}</td>
              <td>{{ data.rgDesc }}</td>
              <td>{{ data.ptTitle }}</td>
              <td>{{ data.NetWeight }}</td>
              <td>$ {{ data.TradeValue }}</td>
              <td>{{ data.yr }}</td>
            </tr>
          </tbody>
          <tbody class="tbody" v-else>
            <tr>
              <td colspan="6" class="text-center">Data tidak ada</td>
            </tr>
          </tbody>
        </table>
        <!-- start:banding -->
        <!-- <div v-if="this.banding == true">
          <div v-if="this.loading" class="btn w-100 mb-4 btn-warning">Loading . . . </div>
          <div v-else @click="getBanding()" class="btn w-100 mb-4 btn-success">Bandingkan Sekarang</div>
        </div>
        <table v-if="this.banding == true" class="table table-bordered">
          <thead class="thead">
            <tr>
              <th>RG Code</th>
              <th>Negara Asal</th>
              <th>Tipe Transaksi</th>
              <th>Negara Tujuan</th>
              <th>Jumlah (KG)</th>
              <th>Biaya</th>
              <th>Tahun</th>
            </tr>
          </thead>
          <tbody class="tbody" v-if="sicBanding.length > 0">
            <tr v-for="data in sicBanding" v-bind:key="data.yr">
              <td>{{ data.rgCode }}</td>
              <td>{{ data.rtTitle }}</td>
              <td>{{ data.rgDesc }}</td>
              <td>{{ data.ptTitle }}</td>
              <td>{{ data.NetWeight }}</td>
              <td>$ {{ data.TradeValue }}</td>
              <td>{{ data.yr }}</td>
            </tr>
          </tbody>
          <tbody class="tbody" v-else>
            <tr>
              <td colspan="7" class="text-center">Data tidak ada</td>
            </tr>
          </tbody>
        </table> -->
        <!-- end:banding -->
      </div>
      <div class="col-12 col-md-4 col-lg-4">
        <!-- card text detail -->
        <div class="card">
          <div class="card-header">
            Detail Information
          </div>
          <div class="card-body px-2 pt-4">
            <div class="row mx-2">
              <div class="col-12">
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Data
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ sic.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Export
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.export.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Import
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.import.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Berat Eksport
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.netWeightEksport }} Kg
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Berat Import
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.netWeightImport }} Kg
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    $-Eksport
                  </div>
                  <div class="col-6" style="text-align: right;">
                    ${{ this.DollarEksport }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                     $-Import
                  </div>
                  <div class="col-6" style="text-align: right;">
                    ${{ this.DollarImport }}
                  </div>
                </div>
              </div>
            </div>
            <!-- <h4 class="text-center mt-4">Negara Pebanding</h4>
            <hr>
            <div class="row mx-2">
              <div class="col-12">
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Data
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ sicBanding.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Export
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.exportBanding.length }}
                  </div>
                </div>
                <div class="row d-flex justify-content-between">
                  <div class="col-6" style="font-weight: bold;">
                    Total Import
                  </div>
                  <div class="col-6" style="text-align: right;">
                    {{ this.importBanding.length }}
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <!-- card chart detail -->
        <div class="card mt-2">
          <div class="card-header">
            Chart Data
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 mb-4">
                <h5>Tahun:</h5> 
                <p class="d-inline mx-2" v-for="row in this.ArrayTahun" :key="row">
                  {{ row }}
                </p>
              </div>
            </div>
            <div class="row mx-2 mb-4">
              <!-- Button trigger modal -->
              <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Informasi Pendukung
              </button>
              <a type="button" class="btn btn-danger mt-3" href="https://docs.google.com/spreadsheets/d/1-KL3Ax43pbs2bgORuGK6wPufM9RZ9GcN47Zf4xkhvpk/edit?usp=sharing" target="_blank">
                Data Tercatat
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Detail Mahasiswa -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">INFORMASI</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <h5 class="text-danger fw-bold">Optimasi Komoditas Kelapa Sawit, Karet dan Kelapa Sebagai Produk Unggulan Nasional Menuju Negara Pendapatan Tinggi 2035</h5>
              <p>
                Dewasa ini pengelolaan sumber daya alam yang berkelanjutan merupakan isu yang sangat penting. Peran usaha sektor perkebunan sebagai komoditas unggulan yang menopang ekonomi nasional, sebagai salah satu penyumbang terbesar devisa negara dengan total nilai ekspor tahun 2019 mencapai US$ 25,36 atau setara Rp. 354,14 triliun (Subagyono, 2021). Tiga jenis komoditas perkebunan yang banyak dikembangkan adalah kelapa sawit, karet dan kelapa. Data ini didukung dengan luas areal, produksi dan produktivitas yang tinggi dibandingkan dengan komoditas perkebunan lainnya.
              </p>
              <p>
                Menurut Direktoral Jendral Perkebunan Kementrian Pertanian, Perkebunan kelapa sawit, karet dan kelapa di Indonesia dikelola dalam 3 bentuk, yaitu: (1) perusahaan besar milik negara yang dikelola oleh BUMN, (2) perusahaan besar yang dikelola oleh perusahaan swasta besar, dan (3) perkebunan rakyat yang dikelola oleh rumah tangga dalam bentuk usaha perorangan.
              </p>
              <p>
                 Perkembangan luas areal perkebunan kelapa sawit, karet, dan kelapa yang terus meningkat melalui berbagai upaya pengembangan, baik yang dilakukan oleh perkebunan besar, proyek-proyek pembangunan maupun swadaya masyarakat. Hingga tahun 2019 tercatat total luas areal kelapa sawit sebesar 14.456.611 Ha, karet 3.676.035 Ha, sedangkan kelapa 3.401.893 Ha. Sehingga didapatkan nilai produktivitas pada masing-masing komoditas yaitu kelapa sawit 3.238 Kg/Ha, karet 1.025 Kg/Ha, dan kelapa 1.114 Kg/Ha (Pertanian, 2021). Perkembangan yang semakin pesat mengindikasikan bahwa Indonesia memliki potensial peningkatan trade value ekspor komoditas perkebunan. Sejalan dengan potensial tersebut, Indonesia memiliki skenario untuk menjadi negara pendapatan tinggi di 2035.
              </p>
              <p>
                Untuk mewujudkan skenario tersebut, Indonesia perlu mengoptimalkan :
              </p>
              <p>
                <ul>
                  <li>
                    Peran Pemerintah sebagai penyediaan bibit bermutu, pendampingan di lapangan, fasilitator penyedia akses pemasaran dan pembuat kebijakan mengenai penyediaan lahan.
                  </li>
                  <li>
                    Peran Swasta dalam meningkatkan kemampuan produksi yang berkelanjutan dan mengembangkan sistem pertanian yang berkelanjutan.
                  </li>
                  <li>
                    Peran Masyarakat dalam meningkatkan peran sub sektor perkebunan kedepan. Upaya mengoptimalkan  komoditas  perkebunan  sebagai produk unggulan diperlukan  strategi  dan kebijakan  yang  mampu  mendorong  kegiatan  perkebunan yang  terus meningkat  dan  berkelanjutan, hingga berdampak pada peningkatan iklim investasi ekspor yang mampu mewujudkan Indonesia sebagai negara pendapatan tinggi 2035 (Bapennas, 2019).
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-12">
              <h5 class="text-danger fw-bold">Pertumbuhan rata-rata dari 2016-2017 (Sumber: Statistik Pertanian 2019)</h5>
              <h6 class="fw-bold">1. Luas Area</h6>
              <ul>
                <li>Kelapa Sawit : 25,42 %</li>
                <li>Karet : 0,55 %</li>
                <li>Kelapa : -4,94 %</li>
              </ul>
              <h6 class="fw-bold">2. Produksi (Ton)</h6>
              <ul>
                <li>Kelapa Sawit : 19,65 %</li>
                <li>Karet : 9,60 %</li>
                <li>Kelapa : -1,72 %</li>
              </ul>
              <h6 class="fw-bold">3. Produktivitas (Kg/Ha)</h6>
              <ul>
                <li>Kelapa Sawit : 1,28 %</li>
                <li>Karet : 9,16 %</li>
                <li>Kelapa : -1,11 %</li>
              </ul>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-12">
              <h5 class="text-danger fw-bold">Luas Areal Komoditas</h5>
              <h6 class="fw-bold">1. Kelapa Sawit</h6>
              <ul>
                <li>Tanaman Rusak / Tanaman Tidak Menghasilkan (TR/TTM) : 466.029 Ha atau 3,22%</li>
                <li>Tanaman Belum Menghasilkan (TBM) :2.134.168 Ha atau 14,76%</li>
                <li>Tanaman Menghasilkan (TM) : 11.856.414 Ha atau 80,01%</li>
              </ul>
              <h6 class="fw-bold">2. Karet</h6>
              <ul>
                <li>Tanaman Rusak / Tanaman Tidak Menghasilkan (TR/TTM) : 137.667Ha atau 4%</li>
                <li>Tanaman Belum Menghasilkan (TBM) : 316.971 Ha atau 8%</li>
                <li>Tanaman Menghasilkan (TM) : 3.221.402 Ha atau 88 %</li>
              </ul>
              <h6 class="fw-bold">3. Kelapa</h6>
              <ul>
                <li>Tanaman Rusak / Tanaman Tidak Menghasilkan (TR/TTM) : 396.724 Ha</li>
                <li>Tanaman Belum Menghasilkan (TBM) : 455.192 Ha</li>
                <li>Tanaman Menghasilkan (TM) : 2.550.040 Ha</li>
              </ul>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-12">
              <h5 class="text-danger fw-bold">Penglola Komoditas Perkebunan di Indonesia</h5>
              <h6 class="fw-bold">1. Kelapa Sawit</h6>
              <ul>
                <li>Perusahaan Besar Swasta (PBS) : 7.942.33 Ha atau 54,94%</li>
                <li>Perusahaan Besar Negara (PBN) : 617.501 Ha atau 4,27%</li>
                <li>Perkebunan Rakyat (PR) : 5.896.755 Ha atau 40,76%</li>
              </ul>
              <h6 class="fw-bold">2. Karet</h6>
              <ul>
                <li>Perusahaan Besar Swasta (PBS) : 241.491 Ha atau 6,57%</li>
                <li>Perusahaan Besar Negara (PBN) : 165.476 Ha atau 4.50%</li>
                <li>Perkebunan Rakyat (PR) : 3.269.078 Ha atau 88,93%</li>
              </ul>
              <h6 class="fw-bold">3. Kelapa</h6>
              <ul>
                <li>Perusahaan Besar Swasta (PBS) : 28.086 Ha atau 0,83%</li>
                <li>Perusahaan Besar Negara (PBN) : 3.929 Ha atau 0,12 %</li>
                <li>Perkebunan Rakyat (PR) : 3.369.878 Ha atau 99.06%</li>
              </ul>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-12">
              <h5 class="fw-bold">Sumber Pendukung</h5>
              <p>- <a href="https://pertanian.go.id/" target="_blank">pertanian.go.id</a></p>
              <p>- <a href="https://www.bappenas.go.id/id/" target="_blank">bappenas.go.id</a></p>
              <p>- <a href="https://pusatprestasinasional.kemdikbud.go.id/labs/uploads/lampiran/Pedoman%20Satria%20Data%202021%20(1).pdf" target="_blank">Buku Pedoman Satria Data</a></p>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-12">
              <h5 class="fw-bold">Identitas Kelompok</h5>
              <div class="container">
                <div class="row text-center mt-4">
                  <div class="col-12">Universitas Ahmad Dahlan</div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-4">Tedi Nizar Afrida</div>
                  <div class="col-4">1800018023</div>
                  <div class="col-4">Informatika</div>
                </div>
                <div class="row">
                  <div class="col-4">Marina Indah Prasasti</div>
                  <div class="col-4">1900018053</div>
                  <div class="col-4">Informatika</div>
                </div>
                <div class="row">
                  <div class="col-4">Lugas Alhawariy</div>
                  <div class="col-4">1800018023</div>
                  <div class="col-4">Informatika</div>
                </div>
                <hr>
                <div class="row">
                  <p class="text-center">Pembimbing: Dinan Yulianto, S.T., M.Eng.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'

export default {
  name: 'SIC',
  components: {
    Navbar,
  },
  data () {
    return {
      loading: false,
      sic: [],
      sicBanding: [],
      export: [],
      import: [],
      exportBanding: [],
      importBanding: [],
      tahun: null ,
      negara: null,
      pebanding: null,
      komoditas: null,
      banding: false,
      ArrayTahun: [],
      netWeightEksport: 0,
      netWeightImport: 0,
      DollarEksport: 0,
      DollarImport: 0
    };
  },
  methods: {
    async getdata() {
      this.netWeightEksport = 0
      this.netWeightImport = 0
      this.DollarEksport = 0
      this.DollarImport = 0
      this.loading = true
      // this.banding = false
      // this.exportBanding = []
      // this.importBanding = []
      // this.sicBanding = []
      await axios.get(`https://comtrade.un.org/api/get`, {
        params: {
          ps: this.tahun,
          r: this.negara,
          px: 'HS',
          p: this.pebanding,
          cc: this.komoditas,
          max: 500,
          freq: 'A',
          rg: 'all',
          type: 'C'
        }
      }).then(res => {
        this.sic = res.data.dataset
        // this.banding = true
        
        // HITUNG EXPORT
        this.export = res.data.dataset.filter(function (item) {
          return item.rgDesc.match("Export")
        })

        // HITUNG IMPORT
        this.import = res.data.dataset.filter(function (item) {
          return item.rgDesc.match("Import")
        })
        // HITUNG BERAT PER TAHUN
        this.spliteTahun()
        this.hitungKiloEksport(this.export)
        this.hitungKiloImport(this.import)
        this.hitungDollarEksport(this.export)
        this.hitungDollarImport(this.import)

        this.loading = false
        return this.sic.sort
        }).catch(err => console.log(err));
    },
    // async getBanding() {
    //   this.loading = true
    //   await axios.get(`https://comtrade.un.org/api/get`, {
    //     params: {
    //       ps: this.tahun,
    //       r: this.pebanding,
    //       px: 'HS',
    //       p: this.negara,
    //       cc: this.komoditas,
    //       max: 500,
    //       freq: 'A',
    //       rg: 'all',
    //       type: 'C'
    //     }
    //   }).then(res => {
    //     this.sicBanding = res.data.dataset
        
    //     // HITUNG EXPORT
    //     this.exportBanding = res.data.dataset.filter(function (item) {
    //       return item.rgDesc.match("Export")
    //     })

    //     // HITUNG IMPORT
    //     this.importBanding = res.data.dataset.filter(function (item) {
    //       return item.rgDesc.match("Import")
    //     })
        
    //     this.loading = false
    //     return this.sic
    //     }).catch(err => console.log(err));
    // },
    spliteTahun(){
      return this.ArrayTahun = this.tahun.split(',')
    },
    hitungKiloEksport(data){
      return data.forEach(element => {
        this.netWeightEksport += parseInt(element.NetWeight);
      });
    },
    hitungKiloImport(data){
      return data.forEach(element => {
        this.netWeightImport += parseInt(element.NetWeight);
      });
    },
    hitungDollarEksport(data){
      return data.forEach(element => {
        this.DollarEksport += parseInt(element.TradeValue);
      });
    },
    hitungDollarImport(data){
      return data.forEach(element => {
        this.DollarImport += parseInt(element.TradeValue);
      });
    }
  },
  mounted() {
  }
};
</script>
