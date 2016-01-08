<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteAutoridad.aspx.cs"
    Inherits="CityTruck.WebSite.Reportes.ReporteAutoridad" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    </div>
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <rsweb:ReportViewer ID="ReportViewer1" runat="server" Width="1200px" Height="600px"
        Font-Names="Verdana" Font-Size="8pt" InteractiveDeviceInfos="(Colección)" WaitMessageFont-Names="Verdana"
        WaitMessageFont-Size="14pt">
        <LocalReport ReportPath="Reportes\ReporteAutoridad.rdlc">
            <DataSources>
                <rsweb:ReportDataSource DataSourceId="ObjectDataSource1" Name="DataSet1" />
            </DataSources>
        </LocalReport>
    </rsweb:ReportViewer>
    <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="ReporteSustanciasControladas"
        TypeName="CityTruck.WebSite.Reportes.SourceReport">
        <SelectParameters>
            <asp:QueryStringParameter DefaultValue="2014" Name="ANIO" QueryStringField="ANIO"
                Type="String" />
            <asp:QueryStringParameter DefaultValue="01" Name="MES" QueryStringField="MES" Type="String" />
            <asp:QueryStringParameter DefaultValue="0" Name="ID_COMBUSTIBLE" QueryStringField="ID_COMBUSTIBLE" Type="Int32" />
        </SelectParameters>
    </asp:ObjectDataSource>
    </form>
</body>
</html>
