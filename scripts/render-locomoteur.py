#!/usr/bin/env python3
# Générateur public : cours pédagogique, jamais retranscription brute.
import json,os
from xml.sax.saxutils import escape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,PageBreak,Table,TableStyle
from reportlab.lib.styles import getSampleStyleSheet,ParagraphStyle
from reportlab.lib.pagesizes import A4,A5,landscape
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.utils import simpleSplit

BASE=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data=json.load(open(os.path.join(BASE,"cours/UE_B1_Systeme_locomoteur_CM_2026.json"),encoding="utf-8"))
DEST=os.path.join(BASE,"documents");os.makedirs(DEST,exist_ok=True)
A4PATH=os.path.join(DEST,"16Hi2fS_oW_u5yV_KG1dcYtZxiE9wjWEW.pdf")
A5PATH=os.path.join(DEST,"1lWOT6PeQwnjPPmqc3-rsSzLMXIQZUmzF.pdf")
pdfmetrics.registerFont(TTFont("DV","/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DVB","/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("DV",normal="DV",bold="DVB")
INK=colors.HexColor("#14324a");T=colors.HexColor("#08746f");P=colors.HexColor("#eaf3f3")
s=getSampleStyleSheet()
s.add(ParagraphStyle(name="HT",fontName="DVB",fontSize=20,leading=25,textColor=INK,spaceAfter=12))
s.add(ParagraphStyle(name="H2X",fontName="DVB",fontSize=12,leading=16,textColor=INK,spaceBefore=14,spaceAfter=8))
s.add(ParagraphStyle(name="BODYX",fontName="DV",fontSize=9.6,leading=14,spaceAfter=7,textColor=INK))
s.add(ParagraphStyle(name="BULX",fontName="DV",fontSize=9.3,leading=13,leftIndent=14,firstLineIndent=-9,spaceAfter=6,textColor=INK))
s.add(ParagraphStyle(name="NOTEX",fontName="DV",fontSize=9,leading=13,spaceAfter=6,textColor=T))
s.add(ParagraphStyle(name="SMALLX",fontName="DV",fontSize=7.9,leading=11,spaceAfter=6,textColor=INK))
def footer(c,d):
 c.saveState();c.setFillColor(INK);c.setFont("DV",8)
 c.drawString(19*mm,11*mm,"UE B1 · Système locomoteur · IFSI 2026–2029")
 c.drawRightString(191*mm,11*mm,str(d.page));c.restoreState()
story=[
 Paragraph("UE B1 · FONDAMENTAUX BIOMÉDICAUX",s["NOTEX"]),
 Paragraph("Système locomoteur",s["HT"]),
 Paragraph("Orthopédie, traumatologie et rôle infirmier",s["BODYX"]),
 Paragraph("CM de G. Micicoi · 3 h 51 min 42 s · Édition pédagogique du 18 octobre 2026 · Numéro CM à confirmer.",s["SMALLX"]),
 Paragraph("<b>Qualité source :</b> le PDF de 128 pages est bien horodaté jusqu'à 231:42 mais comporte d'importantes répétitions automatiques et erreurs de reconnaissance. Les notions ont été reconstruites de façon pédagogique ; ceci n'est pas un verbatim.",s["BODYX"]),
 Paragraph("<b>Objectifs :</b> lire une description de fracture, repérer les urgences vasculo-nerveuses, comprendre les traitements, assurer les surveillances de plâtre et de chirurgie, connaître les principales pathologies.",s["BODYX"]),
 Paragraph("SOMMAIRE",s["H2X"])
]
for i,sec in enumerate(data["sections"],1):
 story.append(Paragraph(f"{i:02d}. {escape(sec[0])}",s["SMALLX"]))
story.append(PageBreak())
for i,sec in enumerate(data["sections"],1):
 story.append(Paragraph(f"{i:02d}  {escape(sec[0])}",s["H2X"]))
 for line in sec[1:-1]:story.append(Paragraph("• "+escape(line),s["BULX"]))
 story.append(Paragraph("<b>Rôle et surveillances infirmiers.</b> "+escape(sec[-1]),s["NOTEX"]))
story.append(Paragraph("Autoévaluation",s["H2X"]))
for x in ["Quels sont les signes d'un syndrome des loges ?","Comment distinguer traitement fonctionnel, orthopédique et chirurgical ?","Que surveiller sous plâtre ?","Quel risque hémodynamique peut compliquer une fracture du fémur ?","Citer les composantes ABCDE.","Quels sont les drapeaux rouges de la lombalgie ?","Quelles surveillances après une fracture de hanche ?","Que mesure la DXA et à quoi sert le DN4 ?"]:
 story.append(Paragraph("• "+escape(x),s["BULX"]))
story.append(Paragraph("Références contrôlées",s["H2X"]))
for ref in data["refs"]:story.append(Paragraph(escape(ref),s["SMALLX"]))
SimpleDocTemplate(A4PATH,pagesize=A4,leftMargin=19*mm,rightMargin=19*mm,topMargin=19*mm,bottomMargin=21*mm,title=data["title"],author="Classeur IFSI 2026-2029").build(story,onFirstPage=footer,onLaterPages=footer)
w,h=landscape(A5);c=__import__("reportlab.pdfgen.canvas",fromlist=["Canvas"]).Canvas(A5PATH,pagesize=(w,h))
cards=data["revision_cards"][:10]
for ci,n in enumerate(cards,1):
 sec=data["sections"][n]
 for face in (0,1):
  page=2*(ci-1)+face+1
  left=15*mm if page%2 else 9*mm;right=9*mm if page%2 else 15*mm
  width=w-left-right
  c.setFillColor(P);c.rect(0,h-27*mm,w,27*mm,fill=1,stroke=0)
  c.setFillColor(INK);c.setFont("DVB",12);c.drawString(left,h-13*mm,f"{ci:02d}. {sec[0]}")
  c.setFont("DV",8);c.drawString(left,h-22*mm,"RECTO · COMPRENDRE" if face==0 else "VERSO · SURVEILLER / AGIR")
  content=sec[1:-1] if face==0 else [sec[-1],"Rechercher une aggravation clinique, alerter selon l'urgence et tracer les transmissions.","Adapter les soins aux prescriptions et aux protocoles du service."]
  y=h-38*mm;fs=9.5
  for bullet in content:
   lines=simpleSplit(bullet,"DV",fs,width-14*mm)
   c.setFillColor(T);c.circle(left+2*mm,y-2,1.3*mm,fill=1,stroke=0)
   c.setFillColor(INK);c.setFont("DV",fs)
   for j,line in enumerate(lines):c.drawString(left+8*mm,y-12*j,line)
   y-=(len(lines)*12+7)
  if y<13*mm:raise RuntimeError("A5 content overflow page "+str(page))
  c.setFont("DV",7);c.setFillColor(INK);c.drawString(left,8*mm,"IFSI 2026–2029 · UE B1 · A5 paysage · retournement bord court")
  c.drawRightString(w-right,8*mm,str(page)+"/20")
  c.showPage()
c.save()
for p in [A4PATH,A5PATH]:print(os.path.basename(p),os.stat(p).st_size)
