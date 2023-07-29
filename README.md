# Proyecto Integrador (Tienda: Evolved Boutique)

Este proyecto es un sitio web desarrollado con una MEAN stack y con comunicación a un dispositivo IoT.

## Lista de enlaces de videos

- [Link de video de Ingreso de nuevo Producto (TikTok)](https://vm.tiktok.com/ZM2swop5N/)
- [Link de video de Facturar (TikTok)](https://vm.tiktok.com/ZM2swxK47/)
- [Link de descarga video de Ingreso de nuevo Producto (MEGA)](https://mega.nz/file/mTZUDQwY#s-3TiWAj8udmit2SJzR1_emL-JruOi1Em1kj3lAbKPc)
- [Link de descarga video de Facturar (MEGA)](https://mega.nz/file/GfRGSLhS#DnoGSEZLq0A5x16ASKZW6mQEc_ITXQ1mMEPa-vf1Otw)

## Explicación del fragmento: Ingreso de nuevo Producto

Video demostrativo: [link de TikTok](https://vm.tiktok.com/ZM2swop5N/)

EL proceso se lleva a cabo en tres fases generales:

- **Envío desde dispositivo IoT.**
- **Recepción de dato del dispositivo IoT en el backend.**
- **Consulta de dato del dispositivo IoT al backend por parte del frontend y guardado en base de datos.**

### Envío desde dispositivo IoT

Dentro del archivo `code_arduino.txt` tendremos el siguiente código:
```
const char* serverUrl = "http://192.168.100.5:3000/datohex";

  // Construir la URL completa con el valor DatoHex como parámetro
  String url = String(serverUrl) + "?datoHex=" + datoHex;

  HTTPClient http;
  http.begin(url);
  
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  // Construir los datos que se enviarán en el cuerpo de la solicitud POST
  String postData = "datoHex=" + datoHex;

  int httpResponseCode = http.POST(postData);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Respuesta del servidor: " + response);
  } else {
    Serial.println("Error en la solicitud HTTP");
  }

  http.end();
```
Este código crea una solicitud HTTP POST al servidor local con la dirección "http://192.168.100.5:3000/datohex" y envía el valor de datoHex como un parámetro en el cuerpo de la solicitud. Luego, el código espera la respuesta del servidor y la imprime en el monitor serial si la solicitud fue exitosa. Si hubo un error en la solicitud, se imprime un mensaje indicando el error.

### Recepción de dato del dispositivo IoT en el backend

En el archivo `index.js` tenemos el primer método que será el encargado de obtener el _datoHex_ enviado por el sensor y guardarlo en una variable llamada _ultimoDatoHex_:
```
app.post('/datohex', (req, res) => {
    const datoHex = req.body.datoHex; // Obtener el valor DatoHex desde el cuerpo de la solicitud
    console.log("Valor recibido del ESP32:", datoHex);



    // Actualizar el valor del último dato recibido
    ultimoDatoHex = datoHex;

    // Configurar el encabezado para permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
    // Configurar el tipo de contenido como texto
    res.header('Content-Type', 'text/plain');

    // Enviar el valor DatoHex en la respuesta como un texto simple
    res.send(datoHex);
});
```
El siguiente método tendrá el objetivo de que al ser requerido se retorne el _ultimoDatoHex_:
```
app.get('/ultimoDatoHex', (req, res) => {
    console.log("Valor enviado a Angular:", ultimoDatoHex);
  
    // Configurar el encabezado para permitir solicitudes desde cualquier origen
    res.header('Access-Control-Allow-Origin', '*');
    // Configurar el tipo de contenido como texto
    res.header('Content-Type', 'text/plain');
  
    // Enviar el valor del último dato recibido en la respuesta
    res.send(ultimoDatoHex);
  });
```
El backend tendrá la posibilidad de mandar datos al frontend a través del middleware _**cors**_. Esto con el uso de las siguientes sentencias:
```
const cors = require('cors');
app.use(cors());
```

### Consulta de dato del dispositivo IoT al backend por parte del frontend y guardado en base de datos

En primera instancia mediante el uso de consultas al servidor __Node.js__ ,del siguiente código del typescript del servicio producto `producto.service.ts`:
```
selectedProducto: Producto;
productos: Producto[]=[];
private serverUrl = 'http://192.168.100.5:3000'; // Reemplaza con la URL de tu servidor Node.js

private ultimoDatoHexSubject = new BehaviorSubject<string>('');
ultimoDatoHex$ = this.ultimoDatoHexSubject.asObservable();

constructor(private http: HttpClient) {
    this.selectedProducto = new Producto();
}
obtenerUltimoDatoHex() {
    // Realiza la solicitud HTTP GET al servidor para obtener el último valor almacenado
    return this.http.get(`${this.serverUrl}/ultimoDatoHex`, { responseType: 'text' });
}
getProductoByRFID(rfid: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.serverUrl}/api/productos/${rfid}`)
      .pipe(
        catchError(this.handleError)
      );
}
```
Junto con el typescript del componente de ingreso productos `ingreso-productos.component.ts` con las funciones:
```
ngOnInit() {
    // Suscribirse al observable para obtener el último dato recibido
    this.productoService.ultimoDatoHex$.subscribe((datoRecibido: string) => {
      this.respuestaObtenida = datoRecibido;
    });
  }

  onSubmit() {
    // Llama al servicio para obtener el último dato almacenado en el servidor
    this.productoService.obtenerUltimoDatoHex().subscribe(
      (datoRecibido: string) => {
        this.respuestaObtenida = datoRecibido;
        // Verificar si el datohex (rfid) ya existe en la base de datos
    this.productoService.getProductoByRFID(this.respuestaObtenida).subscribe(
      (productos: Producto[]) => {
        if (productos && productos.length > 0) {
          // El datohex (rfid) ya existe, mostrar mensaje de error y no guardar el producto
          alert('El datohex (rfid) ya existe en la base de datos. No se puede guardar el producto.');
          window.location.reload();
        } else {
          // Asignar la respuestaObtenida como dato rfid del nuevoProducto
        this.nuevoProducto.rfid = this.respuestaObtenida;
        }
      },
      (error: any) => {
        alert('Error al verificar el datohex (rfid) en la base de datos: ' + JSON.stringify(error));
      }
    );
        
      },
      (error: any) => {
        console.error('Error al obtener el último dato:', error);
      }
    );
  }
```
Se tiene que, ngOnInit() se suscribe al servicio para obtener el último valor de datoHex y mantenerlo actualizado en la variable respuestaObtenida. onSubmit() utiliza ese valor para verificar si el datoHex ya existe en la base de datos antes de decidir si puede guardar un nuevo producto.

En segunda instancia mediante el uso del código del typescript del servicio producto `producto.service.ts` en el que se incluye el método _createProducto()_:
```
createProducto(producto: Producto): Observable<any> {
    return this.http.post(`${this.serverUrl}/api/productos`, producto)
      .pipe(
        catchError(this.handleError)
      );
}
```
Junto con el typescript del componente de ingreso productos `ingreso-productos.component.ts` con las siguientes funciones adicionales:
```
guardarProducto() {
    // Verificar si el datohex (rfid) ya existe en la base de datos
    this.productoService.getProductoByRFID(this.nuevoProducto.rfid).subscribe(
      (productos: Producto[]) => {
        if (productos && productos.length > 0) {
          // El datohex (rfid) ya existe, mostrar mensaje de error y no guardar el producto
          alert('El datohex (rfid) ya existe en la base de datos. No se puede guardar el producto.');
        } else {
          // Validar campos antes de guardar el nuevo producto
          if (this.validateFields()) {
            // El datohex (rfid) no existe, guardar el nuevo producto en el servidor
            this.productoService.createProducto(this.nuevoProducto).subscribe(
              (productoGuardado: Producto) => {
                alert('Producto guardado: ' + JSON.stringify(productoGuardado));
              },
              (error: any) => {
                alert('Error al guardar el producto: ' + JSON.stringify(error));
              }
            );
          } else {
            // Mostrar mensaje de error si algún campo no cumple con las validaciones
            alert('Por favor, revisa los campos ingresados.');
          }
        }
      },
      (error: any) => {
        alert('Error al verificar el datohex (rfid) en la base de datos: ' + JSON.stringify(error));
      }
    );
  }
  
  validateFields(): boolean {
    // Validar que precio_actual sea mayor o igual a cero
    if (this.nuevoProducto.precio_actual < 0) {
      return false;
    }
  
    // Validar que unidades sea mayor o igual a uno y no sea un valor decimal
    if (!Number.isInteger(this.nuevoProducto.unidades) || this.nuevoProducto.unidades < 1) {
      return false;
    }
  
    // Validar que descuento sea mayor o igual a cero
    if (this.nuevoProducto.descuento < 0) {
      return false;
    }
  
    // Todas las validaciones pasaron, devolver true
    return true;
  }
  

  onChangeOferta(): void {
    if (this.nuevoProducto.oferta === 's') {
      // Si la opción es 's', el campo de descuento es editable y el campo de precio_final es no editable
      this.descuentoEditable = true;
      this.precioFinalEditable = false;
      // Calculamos el valor del precio_final en base al precio_actual y descuento
      this.nuevoProducto.precio_final = this.nuevoProducto.precio_actual * ((100-this.nuevoProducto.descuento)/100.0);
    } else if (this.nuevoProducto.oferta === 'n') {
      // Si la opción es 'n', tanto el campo de descuento como el campo de precio_final son no editables y se establecen como cero
      this.descuentoEditable = false;
      this.precioFinalEditable = false;
      this.nuevoProducto.descuento = 0;
      this.nuevoProducto.precio_final = this.nuevoProducto.precio_actual;
    }
  }

  // Función para actualizar el valor de precio_final en tiempo real cuando se ingrese el descuento
  actualizarPrecioFinal(): void {
    if (this.nuevoProducto.descuento !== null && this.nuevoProducto.descuento !== undefined) {
      this.nuevoProducto.precio_final = this.nuevoProducto.precio_actual * ((100-this.nuevoProducto.descuento)/100.0);
    }
  }
```
Se tiene en resumen que, guardarProducto() verifica si el datoHex (rfid) del nuevo producto ya existe en la base de datos y realiza validaciones de campos antes de guardar el nuevo producto. validateFields() realiza las validaciones, onChangeOferta() actualiza la interfaz según el tipo de oferta seleccionada ('s' o 'n'), y actualizarPrecioFinal() recalcula el precio_final cuando se ingresa un nuevo valor de descuento.

## Explicación del fragmento: Facturar

Video demostrativo: [link de TikTok](https://vm.tiktok.com/ZM2swxK47/)

EL proceso se lleva a cabo en tres fases generales, de estas, las dos primeras son similares al anterior fragmento:

- **Envío desde dispositivo IoT.**
- **Recepción de dato del dispositivo IoT en el backend.**
- **Consulta de dato del dispositivo IoT al backend por parte del frontend y creación de factura.**

### Consulta de dato del dispositivo IoT al backend por parte del frontend y creación de factura

Inicia la consulta del _datoHex_ por medio de las funciones que se encuentran en `producto.service.ts`, en este caso igual que para el ingreso de nuevo producto una vez obtenido el dato, se lleva a cabo una verificación de la existencia del código rfid en la base de datos por medio de la función del archivo `facturar.component.ts`:
```
onSubmit() {
    // Llama al servicio para obtener el último dato almacenado en el servidor
    this.productoService.obtenerUltimoDatoHex().subscribe(
      (datoRecibido: string) => {
        this.respuestaObtenida = datoRecibido;
  
        // Verificar si existe el producto con el rfid obtenido
        this.productoService.getProductoByRFID(this.respuestaObtenida).subscribe(
          (productos: Producto[]) => {
            if (productos && productos.length > 0) {
              // Asignar la respuestaObtenida como dato rfid del nuevoProducto
              this.nuevoProducto.rfid = this.respuestaObtenida;
              // Si se encontró el producto, mostrar los detalles en el formulario
              this.nuevoProducto = productos[0]; // Suponemos que solo hay un producto con el mismo rfid
              this.errorProductoNoEncontrado = false;
            } else {
              // Si no se encontró el producto, mostrar mensaje de error
              this.errorProductoNoEncontrado = true;
              alert('No hay un producto registrado con el RFID dado');
            }
          },
          (error: any) => {
            alert('Error al obtener el producto: ' + JSON.stringify(error));
          }
        );
      },
      (error: any) => {
        alert('Error al obtener el último dato: ' + JSON.stringify(error));
      }
    );
  }
```
De existir un producto que ya esté usando ese rfid pues los datos necesarios de este serán devueltos al formulario. Dado la existencia de la verificación también al ingresar un producto solo debe existir un producto con ese rfid. Una vez que estemos seguros del valor de unidades que desea comprar el cliente en el primer formulario del documento `factura.component.html`:
```
<div *ngIf="nuevoProducto.rfid">
  <h2>Detalles del producto</h2>
  <form (ngSubmit)="agregarProducto()">
    <label for="descripcion">Descripción:</label>
    <input type="text" id="descripcion" name="descripcion" [(ngModel)]="nuevoProducto.descripcion" disabled>

    <label for="unidades">Unidades:</label>
    <input type="number" id="unidades" name="unidades" [(ngModel)]="nuevoProducto.unidades" min="1">

    <label for="precioFinal">Precio Final:</label>
    <input type="number" id="precioFinal" name="precioFinal" [(ngModel)]="nuevoProducto.precio_final" disabled>

    <label for="valorFinal">Valor Final:</label>
    <input type="number" id="valorFinal" name="valorFinal" [(ngModel)]="nuevoProducto.unidades * nuevoProducto.precio_final" disabled>

    <button type="submit">Agregar</button>
  </form>
</div>
```
Procederemos a agregar el producto mediante el método _agregarProducto()_ del file `facturar.component.ts`:
```
agregarProducto() {
    if (Number.isInteger(this.nuevoProducto.unidades) && this.nuevoProducto.unidades >= 1){
      // Calcular el precio final y agregar el producto al array de productos de la factura
      const precio_final = this.nuevoProducto.precio_actual * this.nuevoProducto.unidades;
      const productoFactura: ProductoFactura = {
        descripcion: this.nuevoProducto.descripcion,
        unidades: this.nuevoProducto.unidades,
        valor_unitario: this.nuevoProducto.precio_actual,
        valor_final: precio_final // Usamos el precio_final calculado
      };
      this.factura.productos.push(productoFactura);

      // Calcular el totalValorFinal de la factura
      this.totalValorFinal = this.factura.productos.reduce((total, producto) => total + producto.valor_final, 0);

      // Limpiar los campos para agregar otro producto
      this.nuevoProducto = new Producto();
    }else{
      alert('Las unidades no pueden ser menores a 1 ni decimales');
    }
  }
```
En la tabla del formulario de factura del doc html:
```
<h2>Productos agregados</h2>
    <table>
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Unidades</th>
          <th>Valor Unitario</th>
          <th>Valor Final</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let producto of factura.productos">
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.unidades }}</td>
          <td>{{ producto.valor_unitario }}</td>
          <td>{{ producto.valor_unitario * producto.unidades }}</td>
        </tr>
      </tbody>
    </table>
``` 
Además, la función también calculará el total del valor final y lo veremos en este fragmento del código:
```
<p>Total Valor Final: {{ totalValorFinal }}</p>
```
Cuando ya hemos agregado todos los productos deseados completaremos la parte inicial del formulario de factura con los datos del cliente como nombre, correo, teléfono, etc.
Al guardar la factura se utilizarán las siguientes funciones:
```
generarPDF() {
    const doc = new jsPDF();
    
    // Encabezado del PDF
    doc.setFontSize(18);
    doc.text('Factura', 10, 20);

    // Información de la factura
    doc.setFontSize(12);
    doc.text(`Nombre: ${this.factura.nombre}`, 10, 30);
    doc.text(`Correo: ${this.factura.correo}`, 10, 40);
    doc.text(`Teléfono: ${this.factura.telefono}`, 10, 50);
    // Agregar más información relevante de la factura aquí
    // ...

    // Tabla con los productos agregados
    const data = this.factura.productos.map(producto => [producto.descripcion, producto.unidades, producto.valor_unitario, producto.valor_final]);
    (doc as any).autoTable({
      head: [['Descripción', 'Unidades', 'Valor Unitario', 'Valor Final']],
      body: data,
      startY: 60
    });

    // Total Valor Final
    doc.text(`Total Valor Final: ${this.totalValorFinal}`, 10, (doc as any).previousAutoTable.finalY + 10);

    // Guardar el PDF
    doc.save('factura.pdf');
  }
  guardarFactura() {
    // Asignar el valor total al campo 'valor_total' de la factura
    this.factura.valor_total = this.totalValorFinal;
  

    this.facturaService.createFactura(this.factura).subscribe(
      (response) => {
        console.log('Factura guardada:', response);
        this.generarPDF();
        // Reseteamos los campos
        this.factura = new Factura();
        this.totalValorFinal = 0;
      },
      (error) => {
        console.error('Error al guardar la factura:', error);
      }
    );
  }
```
Dentro de esto encontramos que:
1. __generarPDF()__: Esta función se utiliza para generar y guardar un archivo PDF que contiene la información de la factura. Utiliza la librería **jsPDF** para crear el documento PDF. El PDF tiene un encabezado que indica que es una factura, y luego muestra la información de la factura, como el nombre, correo, teléfono y otros detalles relevantes. A continuación, crea una tabla con los productos agregados a la factura, mostrando detalles como descripción, unidades, valor unitario y valor final. Finalmente, muestra el total del valor final de la factura. Después de generar el contenido del PDF, lo guarda con el nombre 'factura.pdf'.
1. __guardarFactura()__: Esta función se llama cuando se desea guardar la factura en el servidor. Primero, asigna el valor total de la factura (_**totalValorFinal**_) al campo 'valor_total' de la factura. Luego, utiliza el servicio _**facturaService**_ para crear la factura en el servidor mediante una solicitud HTTP POST. Si la operación tiene éxito, llama a la función _**generarPDF()**_ para crear y guardar el archivo PDF de la factura. Luego, resetea los campos relacionados con la factura para que el usuario pueda ingresar una nueva factura si es necesario.

## Autores

- [Kevin Castillo](https://github.com/KevsWit)
- [Lenin Llano](https://github.com/StevenSsj1)
- [Carlos Salcán](https://github.com/C-A-L-E-L)