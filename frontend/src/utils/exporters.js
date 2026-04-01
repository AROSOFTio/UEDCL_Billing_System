import ExcelJS from 'exceljs';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoSrc from '../assets/logo.png';
import { APP_TITLE } from './constants';
import { formatCurrency, formatDateTime, formatNumber, formatPercent, titleCase } from './formatters';

const reportFilenameDate = () => new Date().toISOString().slice(0, 10);
let logoCachePromise;

function saveBlob(blob, fileName) {
  const objectUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(objectUrl);
}

async function getLogoAsset() {
  if (!logoCachePromise) {
    logoCachePromise = fetch(logoSrc).then(async (response) => {
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();

      return {
        dataUrl: await blobToDataUrl(blob),
        base64: arrayBufferToBase64(arrayBuffer),
        extension: 'png',
      };
    });
  }

  return logoCachePromise;
}

function arrayBufferToBase64(arrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return window.btoa(binary);
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function addPdfBrandHeader(doc, generatedAt, title, subtitle) {
  const logo = await getLogoAsset();
  doc.addImage(logo.dataUrl, 'PNG', 14, 10, 24, 12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(APP_TITLE, 42, 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(title, 42, 24);
  doc.text(subtitle, 42, 30);
  doc.text(`Generated: ${formatDateTime(generatedAt)}`, 14, 38);
}

function addSectionTitle(doc, title, y) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(title, 14, y);
}

function styleSheetHeader(row) {
  row.font = { color: { argb: 'FFFFFFFF' }, bold: true };
  row.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF3543BB' },
  };
}

export async function exportExecutiveReportPdf(report) {
  const doc = new jsPDF();
  const generatedAt = report.generated_at || new Date().toISOString();

  await addPdfBrandHeader(
    doc,
    generatedAt,
    'Executive Reporting Pack',
    'Administrative financial, billing, payment, and complaint performance summary'
  );

  autoTable(doc, {
    startY: 44,
    head: [['Indicator', 'Value']],
    body: [
      ['Total Customers', formatNumber(report.summary.total_customers)],
      ['Active Customers', formatNumber(report.summary.active_customers)],
      ['Total Meters', formatNumber(report.summary.total_meters)],
      ['Active Meters', formatNumber(report.summary.active_meters)],
      ['Bills Generated', formatNumber(report.summary.total_bills_generated)],
      ['Open Bills', formatNumber(report.summary.total_unpaid_bills)],
      ['Resolved Complaints', formatNumber(report.summary.resolved_complaints)],
      ['Unresolved Complaints', formatNumber(report.summary.unresolved_complaints)],
    ],
    theme: 'grid',
    headStyles: { fillColor: [53, 67, 187] },
  });

  addSectionTitle(doc, 'Revenue Overview', doc.lastAutoTable.finalY + 12);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 16,
    head: [['Metric', 'Value']],
    body: [
      ['Total Billed Value', formatCurrency(report.revenue_overview.total_billed_amount)],
      ['Collected Revenue', formatCurrency(report.revenue_overview.total_collected_amount)],
      ['Outstanding Balance', formatCurrency(report.revenue_overview.outstanding_balance)],
      ['Overdue Exposure', formatCurrency(report.revenue_overview.overdue_exposure)],
      ['Collection Rate', formatPercent(report.revenue_overview.collection_rate)],
      ['Average Bill Value', formatCurrency(report.revenue_overview.average_bill_value)],
      ['Average Units Consumed', formatNumber(report.revenue_overview.average_units_consumed)],
    ],
    theme: 'grid',
    headStyles: { fillColor: [53, 67, 187] },
  });

  addSectionTitle(doc, 'Billing Status Breakdown', doc.lastAutoTable.finalY + 12);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 16,
    head: [['Status', 'Bills', 'Billed Value', 'Outstanding']],
    body: report.billing_status_breakdown.map((item) => [
      titleCase(item.status),
      formatNumber(item.bill_count),
      formatCurrency(item.billed_amount),
      formatCurrency(item.outstanding_amount),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [53, 67, 187] },
  });

  doc.addPage();
  await addPdfBrandHeader(
    doc,
    generatedAt,
    'Executive Reporting Pack',
    'Payment channels, complaint handling, and monthly performance'
  );

  autoTable(doc, {
    startY: 44,
    head: [['Payment Method', 'Transactions', 'Collected Value']],
    body: report.payment_method_breakdown.map((item) => [
      titleCase(item.payment_method),
      formatNumber(item.payment_count),
      formatCurrency(item.collected_amount),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [53, 67, 187] },
  });

  addSectionTitle(doc, 'Complaint Status Breakdown', doc.lastAutoTable.finalY + 12);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 16,
    head: [['Status', 'Cases']],
    body: report.complaint_status_breakdown.map((item) => [
      titleCase(item.status),
      formatNumber(item.complaint_count),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [53, 67, 187] },
  });

  addSectionTitle(doc, 'Monthly Performance', doc.lastAutoTable.finalY + 12);
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 16,
    head: [['Period', 'Bills', 'Billed Value', 'Payments', 'Collected Value', 'Complaints']],
    body: report.monthly_performance.map((item) => [
      item.period,
      formatNumber(item.bills_generated),
      formatCurrency(item.billed_amount),
      formatNumber(item.payments_recorded),
      formatCurrency(item.collected_amount),
      formatNumber(item.complaints_logged),
    ]),
    theme: 'grid',
    headStyles: { fillColor: [53, 67, 187] },
  });

  doc.save(`uedcl-executive-report-${reportFilenameDate()}.pdf`);
}

export async function exportExecutiveReportExcel(report) {
  const workbook = new ExcelJS.Workbook();
  const logo = await getLogoAsset();
  const logoId = workbook.addImage({
    base64: logo.base64,
    extension: logo.extension,
  });

  const overviewSheet = workbook.addWorksheet('Overview');
  overviewSheet.columns = [
    { key: 'label', width: 30 },
    { key: 'value', width: 24 },
    { key: 'notes', width: 40 },
  ];
  overviewSheet.addImage(logoId, { tl: { col: 0, row: 0 }, ext: { width: 120, height: 42 } });
  overviewSheet.getCell('B1').value = APP_TITLE;
  overviewSheet.getCell('B1').font = { bold: true, size: 14 };
  overviewSheet.getCell('B2').value = 'Executive Reporting Pack';
  overviewSheet.getCell('B3').value = `Generated ${formatDateTime(report.generated_at)}`;
  overviewSheet.getRow(5).values = ['Indicator', 'Value', 'Notes'];
  styleSheetHeader(overviewSheet.getRow(5));
  [
    ['Total Customers', formatNumber(report.summary.total_customers), `${formatNumber(report.summary.active_customers)} active accounts`],
    ['Total Meters', formatNumber(report.summary.total_meters), `${formatNumber(report.summary.active_meters)} active service points`],
    ['Bills Generated', formatNumber(report.summary.total_bills_generated), `${formatNumber(report.summary.total_unpaid_bills)} open bills`],
    ['Collected Revenue', formatCurrency(report.revenue_overview.total_collected_amount), `Collection rate ${formatPercent(report.revenue_overview.collection_rate)}`],
    ['Outstanding Balance', formatCurrency(report.revenue_overview.outstanding_balance), `Overdue exposure ${formatCurrency(report.revenue_overview.overdue_exposure)}`],
    [
      'Active Tariff',
      report.operational_overview.active_tariff?.name || 'Not set',
      report.operational_overview.active_tariff
        ? `${formatCurrency(report.operational_overview.active_tariff.unit_price)} per unit | Fixed ${formatCurrency(report.operational_overview.active_tariff.fixed_charge)}`
        : 'No active tariff configured',
    ],
  ].forEach((row) => overviewSheet.addRow(row));

  const billingSheet = workbook.addWorksheet('Billing Status');
  billingSheet.columns = [
    { key: 'status', width: 22 },
    { key: 'bill_count', width: 12 },
    { key: 'billed_amount', width: 18 },
    { key: 'outstanding_amount', width: 18 },
  ];
  billingSheet.getRow(1).values = ['Status', 'Bills', 'Billed Value', 'Outstanding'];
  styleSheetHeader(billingSheet.getRow(1));
  report.billing_status_breakdown.forEach((item) => {
    billingSheet.addRow([titleCase(item.status), item.bill_count, Number(item.billed_amount), Number(item.outstanding_amount)]);
  });
  billingSheet.getColumn(3).numFmt = '#,##0.00';
  billingSheet.getColumn(4).numFmt = '#,##0.00';

  const paymentSheet = workbook.addWorksheet('Payment Methods');
  paymentSheet.columns = [
    { key: 'payment_method', width: 22 },
    { key: 'payment_count', width: 16 },
    { key: 'collected_amount', width: 18 },
  ];
  paymentSheet.getRow(1).values = ['Payment Method', 'Transactions', 'Collected Value'];
  styleSheetHeader(paymentSheet.getRow(1));
  report.payment_method_breakdown.forEach((item) => {
    paymentSheet.addRow([titleCase(item.payment_method), item.payment_count, Number(item.collected_amount)]);
  });
  paymentSheet.getColumn(3).numFmt = '#,##0.00';

  const complaintSheet = workbook.addWorksheet('Complaints');
  complaintSheet.columns = [
    { key: 'status', width: 22 },
    { key: 'complaint_count', width: 14 },
  ];
  complaintSheet.getRow(1).values = ['Status', 'Cases'];
  styleSheetHeader(complaintSheet.getRow(1));
  report.complaint_status_breakdown.forEach((item) => {
    complaintSheet.addRow([titleCase(item.status), item.complaint_count]);
  });

  const monthlySheet = workbook.addWorksheet('Monthly Performance');
  monthlySheet.columns = [
    { key: 'period', width: 16 },
    { key: 'bills_generated', width: 12 },
    { key: 'billed_amount', width: 18 },
    { key: 'payments_recorded', width: 14 },
    { key: 'collected_amount', width: 18 },
    { key: 'complaints_logged', width: 14 },
  ];
  monthlySheet.getRow(1).values = ['Period', 'Bills', 'Billed Value', 'Payments', 'Collected Value', 'Complaints'];
  styleSheetHeader(monthlySheet.getRow(1));
  report.monthly_performance.forEach((item) => {
    monthlySheet.addRow([
      item.period,
      item.bills_generated,
      Number(item.billed_amount),
      item.payments_recorded,
      Number(item.collected_amount),
      item.complaints_logged,
    ]);
  });
  monthlySheet.getColumn(3).numFmt = '#,##0.00';
  monthlySheet.getColumn(5).numFmt = '#,##0.00';

  const buffer = await workbook.xlsx.writeBuffer();
  saveBlob(
    new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
    `uedcl-executive-report-${reportFilenameDate()}.xlsx`
  );
}

export async function downloadReceiptPdf(receipt) {
  const doc = new jsPDF();
  const generatedAt = receipt.issued_at || new Date().toISOString();

  await addPdfBrandHeader(
    doc,
    generatedAt,
    'Official Payment Receipt',
    'Generated from the Online Electricity Billing and Payment System for UEDCL'
  );

  autoTable(doc, {
    startY: 48,
    body: [
      ['Receipt Number', receipt.receipt_number || '-'],
      ['Issued At', formatDateTime(receipt.issued_at)],
      ['Payment Number', receipt.payment?.payment_number || '-'],
      ['Bill Number', receipt.payment?.bill?.bill_number || '-'],
      ['Customer', receipt.payment?.bill?.customer?.name || '-'],
      ['Account Number', receipt.payment?.bill?.customer?.account_number || '-'],
      ['Payment Method', titleCase(receipt.payment?.payment_method)],
      ['Amount', formatCurrency(receipt.payment?.amount)],
      ['Recorded By', receipt.payment?.staff?.name || '-'],
    ],
    theme: 'grid',
    styles: { cellPadding: 3.5 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [238, 242, 255], textColor: [23, 35, 60], cellWidth: 46 },
    },
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(
    'This receipt confirms a recorded payment entry against the referenced electricity bill.',
    14,
    doc.lastAutoTable.finalY + 14
  );

  doc.save(`uedcl-receipt-${receipt.receipt_number || reportFilenameDate()}.pdf`);
}

export async function exportDynamicReportPdf(reportType, data, filters = {}) {
  const doc = new jsPDF();
  const generatedAt = new Date().toISOString();
  
  const reportTitles = {
    billing_history: 'Billing History Report',
    payment_history: 'Payment History Ledger',
    complaint_log: 'Service Complaint Log',
    revenue_summary: 'Revenue Collection Summary',
  };

  const title = reportTitles[reportType] || 'Custom Report Extract';
  let subtitle = 'Custom parameterized report export.';
  if (filters.start_date || filters.end_date) {
    subtitle = `Period: ${filters.start_date || 'Inception'} to ${filters.end_date || 'Present'}`;
  }
  if (filters.status && filters.status !== 'all') {
    subtitle += ` | Filter: ${titleCase(filters.status)}`;
  }

  await addPdfBrandHeader(doc, generatedAt, title, subtitle);

  if (!data || data.length === 0) {
    doc.text('No matching records found for the selected parameters.', 14, 48);
    doc.save(`uedcl-${reportType}-${reportFilenameDate()}.pdf`);
    return;
  }

  let head = [];
  let body = [];

  if (reportType === 'billing_history') {
    head = [['Bill Ref', 'Date', 'Customer', 'Account', 'Amount', 'Status']];
    body = data.map((b) => [
      b.bill_number,
      formatDateTime(b.created_at),
      b.customer?.name || '-',
      b.customer?.account_number || '-',
      formatCurrency(b.total_amount),
      titleCase(b.status),
    ]);
  } else if (reportType === 'payment_history') {
    head = [['Payment Ref', 'Date', 'Method', 'Customer', 'Bill Number', 'Amount']];
    body = data.map((p) => [
      p.payment_number,
      formatDateTime(p.paid_at),
      titleCase(p.payment_method),
      p.bill?.customer?.name || '-',
      p.bill?.bill_number || '-',
      formatCurrency(p.amount),
    ]);
  } else if (reportType === 'complaint_log') {
    head = [['Log ID', 'Logged At', 'Customer', 'Category', 'Subject', 'Status']];
    body = data.map((c) => [
      c.id,
      formatDateTime(c.created_at),
      c.customer?.name || '-',
      titleCase(c.category),
      c.subject,
      titleCase(c.status),
    ]);
  } else if (reportType === 'revenue_summary') {
    head = [['Financial Metric', 'Reported Value']];
    body = data.map((r) => [
      r.metric,
      typeof r.value === 'number' ? (r.metric.includes('Count') ? formatNumber(r.value) : formatCurrency(r.value)) : r.value,
    ]);
  }

  autoTable(doc, {
    startY: 44,
    head: head,
    body: body,
    theme: 'grid',
    headStyles: { fillColor: [53, 67, 187] },
    styles: { fontSize: 8, cellPadding: 3 },
  });

  doc.save(`uedcl-${reportType}-${reportFilenameDate()}.pdf`);
}