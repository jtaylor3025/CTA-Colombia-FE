import { Arl } from '../../../arl/core/models/main.models';
import { Pais } from '../../../pais/core/models/main.model';
import { Tipodocumento } from '../../../tipodocumento/core/models/main.model';

export class Estudiante {
  estudianteDocumento: string = '';
  estudianteTipodocu: Tipodocumento | undefined;
  estudiantePrimernombre: string = '';
  estudianteSegundonombre: string = '';
  estudiantePrimerapellido: string = '';
  estudianteSegundoapellido: string = '';
  estudianteGenero: string = '';
  estudiantePais: Pais | undefined;
  estudianteNacimiento: string = '';
  estudianteNiveleducativo: string = '';
  estudianteAreatrabajo: string = '';
  estudianteCargo: string = '';
  estudianteSector: string = '';
  estudianteArl: Arl | undefined;
}
